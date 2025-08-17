import {Form, Formik, useField} from 'formik';
import * as Yup from 'yup';
import {Alert, AlertIcon, Box, Button, FormLabel, Image, Input, Stack, VStack} from "@chakra-ui/react";
import {customerProfilePictureUrl, updateCustomer, uploadCustomerProfilePicture} from "../../services/client.js";
import {errorNotification, successNotification} from "../../services/notification.js";
import {useCallback, useState, useEffect} from "react";
import {useDropzone} from "react-dropzone";

const MyTextInput = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <Box>
            <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            <Input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <Alert className="error" status={"error"} mt={2}>
                    <AlertIcon/>
                    {meta.error}
                </Alert>
            ) : null}
        </Box>
    );
};

const MyDropzone = ({ customerId, fetchCustomers, onImageUpload }) => {
    const onDrop = useCallback(acceptedFiles => {
        console.log("Uploading file:", acceptedFiles[0]);
        const formData = new FormData();
        formData.append("file", acceptedFiles[0])

        uploadCustomerProfilePicture(
            customerId,
            formData
        ).then((response) => {
            console.log("Upload response:", response);
            successNotification("Success", "Profile picture uploaded")
            fetchCustomers()
            onImageUpload() // Trigger image refresh
        }).catch((error) => {
            console.error("Upload error:", error.response?.data || error);
            errorNotification("Error", `Profile picture upload failed: ${error.response?.data?.message || error.message}`)
        })
    }, [customerId, fetchCustomers, onImageUpload])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <Box {...getRootProps()}
             w={'100%'}
             textAlign={'center'}
             border={'dashed'}
             borderColor={'gray.200'}
             borderRadius={'3xl'}
             p={6}
             rounded={'md'}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the picture here ...</p> :
                    <p>Drag 'n' drop picture here, or click to select picture</p>
            }
        </Box>
    )
}

const UpdateCustomerForm = ({fetchCustomers, initialValues, customerId}) => {
    const [imageKey, setImageKey] = useState(Date.now());
    const [imageUrl, setImageUrl] = useState(null);
    const [isLoadingImage, setIsLoadingImage] = useState(true);

    // Function to load image with authentication
    const loadImage = useCallback(async () => {
        setIsLoadingImage(true);
        try {
            const response = await fetch(`${customerProfilePictureUrl(customerId)}?t=${imageKey}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setImageUrl(url);
                console.log("Image loaded successfully");
            } else {
                console.log("Failed to load image:", response.status, response.statusText);
                setImageUrl(null);
            }
        } catch (error) {
            console.error("Error loading image:", error);
            setImageUrl(null);
        } finally {
            setIsLoadingImage(false);
        }
    }, [customerId, imageKey]);

    // Load image on component mount and when imageKey changes
    useEffect(() => {
        loadImage();

        // Cleanup previous blob URL
        return () => {
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl);
            }
        };
    }, [loadImage]);

    const handleImageUpload = useCallback(() => {
        console.log("Refreshing image with new timestamp");
        setImageKey(Date.now());
    }, []);

    // Default placeholder image as data URI
    const placeholderImage = `data:image/svg+xml;base64,${btoa(`
        <svg width="150" height="150" xmlns="http://www.w3.org/2000/svg">
            <rect width="150" height="150" fill="#e2e8f0"/>
            <circle cx="75" cy="60" r="20" fill="#a0aec0"/>
            <path d="M30 120 Q75 90 120 120 L120 150 L30 150 Z" fill="#a0aec0"/>
            <text x="75" y="140" font-family="Arial" font-size="10" fill="#718096" text-anchor="middle">Profile Picture</text>
        </svg>
    `)}`;

    return (
        <>
            <VStack spacing={'5'} mb={'5'}>
                <Image
                    borderRadius={"full"}
                    boxSize={"150px"}
                    objectFit={"cover"}
                    src={imageUrl || placeholderImage}
                    alt="Profile"
                    opacity={isLoadingImage ? 0.6 : 1}
                    transition="opacity 0.2s"
                />
                {isLoadingImage && <Box fontSize="sm" color="gray.500">Loading image...</Box>}
                <MyDropzone
                    customerId={customerId}
                    fetchCustomers={fetchCustomers}
                    onImageUpload={handleImageUpload}
                />
            </VStack>
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                    email: Yup.string()
                        .email('Must be 20 characters or less')
                        .required('Required'),
                    age: Yup.number()
                        .min(16, 'Must be at least 16 years of age')
                        .max(100, 'Must be less than 100 years of age')
                        .required(),
                })}
                onSubmit={(updatedCustomer, {setSubmitting}) => {
                    setSubmitting(true);
                    updateCustomer(customerId, updatedCustomer)
                        .then(res => {
                            console.log(res);
                            successNotification(
                                "Customer updated",
                                `${updatedCustomer.name} was successfully updated`
                            )
                            fetchCustomers();
                        }).catch(err => {
                        console.log(err);
                        errorNotification(
                            err.code,
                            err.response.data.message
                        )
                    }).finally(() => {
                        setSubmitting(false);
                    })
                }}
            >
                {({isValid, isSubmitting, dirty}) => (
                    <Form>
                        <Stack spacing={"24px"}>
                            <MyTextInput
                                label="Name"
                                name="name"
                                type="text"
                                placeholder="Jane"
                            />

                            <MyTextInput
                                label="Email Address"
                                name="email"
                                type="email"
                                placeholder="jane@formik.com"
                            />

                            <MyTextInput
                                label="Age"
                                name="age"
                                type="number"
                                placeholder="20"
                            />

                            <Button disabled={!(isValid && dirty) || isSubmitting} type="submit">Submit</Button>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default UpdateCustomerForm;