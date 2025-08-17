import {
    AlertDialog,
    AlertDialogBody, AlertDialogContent,
    AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay,
    Avatar,
    Box,
    Button,
    Center,
    Flex,
    Heading,
    Image,
    Stack,
    Tag,
    Text,
    useColorModeValue, useDisclosure,
} from '@chakra-ui/react';

import {useRef, useState, useEffect, useCallback} from 'react'
import {deleteCustomer} from "../../services/client.js";
import {errorNotification, successNotification} from "../../services/notification.js";
import UpdateCustomerDrawer from "./UpdateCustomerDrawer.jsx";
import {customerProfilePictureUrl} from "../../services/client.js";

export default function CardWithImage({id, name, email, age, gender, imageNumber, fetchCustomers}) {
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [isLoadingAvatar, setIsLoadingAvatar] = useState(true);

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()

    // Function to load avatar image with authentication
    const loadAvatarImage = useCallback(async () => {
        setIsLoadingAvatar(true);
        try {
            const response = await fetch(`${customerProfilePictureUrl(id)}?t=${Date.now()}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setAvatarUrl(url);
            } else {
                console.log("Failed to load avatar image for customer", id);
                setAvatarUrl(null);
            }
        } catch (error) {
            console.error("Error loading avatar image:", error);
            setAvatarUrl(null);
        } finally {
            setIsLoadingAvatar(false);
        }
    }, [id]);

    // Load avatar image on component mount
    useEffect(() => {
        loadAvatarImage();

        // Cleanup blob URL
        return () => {
            if (avatarUrl) {
                URL.revokeObjectURL(avatarUrl);
            }
        };
    }, [loadAvatarImage]);

    // Default placeholder for avatar
    const defaultAvatarImage = `data:image/svg+xml;base64,${btoa(`
        <svg width="128" height="128" xmlns="http://www.w3.org/2000/svg">
            <circle cx="64" cy="64" r="64" fill="#e2e8f0"/>
            <circle cx="64" cy="48" r="20" fill="#a0aec0"/>
            <path d="M20 110 Q64 80 108 110 L108 128 L20 128 Z" fill="#a0aec0"/>
        </svg>
    `)}`;

    return (
        <Center py={6}>
            <Box
                maxW={'300px'}
                minW={'300px'}
                w={'full'}
                m={2}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'lg'}
                rounded={'md'}
                overflow={'hidden'}>
                <Image
                    h={'120px'}
                    w={'full'}
                    src={
                        'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
                    }
                    objectFit={'cover'}
                />
                <Flex justify={'center'} mt={-12}>
                    <Avatar
                        size={'xl'}
                        src={avatarUrl || defaultAvatarImage}
                        alt={'Customer Avatar'}
                        opacity={isLoadingAvatar ? 0.6 : 1}
                        css={{
                            border: '2px solid white',
                        }}
                    />
                </Flex>

                <Box p={6}>
                    <Stack spacing={2} align={'center'} mb={5}>
                        <Tag borderRadius={"full"}>{id}</Tag>
                        <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                            {name}
                        </Heading>
                        <Text color={'gray.500'}>{email}</Text>
                        <Text color={'gray.500'}>Age {age} | {gender}</Text>
                    </Stack>
                </Box>
                <Stack direction={'row'} justify={'center'} spacing={6} p={4}>
                    <Stack>
                        <UpdateCustomerDrawer
                            initialValues={{ name, email, age }}
                            customerId={id}
                            fetchCustomers={fetchCustomers}
                        />
                    </Stack>
                    <Stack>
                        <Button
                            bg={'red.400'}
                            color={'white'}
                            rounded={'full'}
                            _hover={{
                                transform: 'translateY(-2px)',
                                boxShadow: 'lg'
                            }}
                            _focus={{
                                bg: 'green.500'
                            }}
                            onClick={onOpen}
                        >
                            Delete
                        </Button>
                        <AlertDialog
                            isOpen={isOpen}
                            leastDestructiveRef={cancelRef}
                            onClose={onClose}
                        >
                            <AlertDialogOverlay>
                                <AlertDialogContent>
                                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                        Delete Customer
                                    </AlertDialogHeader>

                                    <AlertDialogBody>
                                        Are you sure you want to delete {name}? You can't undo this action afterwards.
                                    </AlertDialogBody>

                                    <AlertDialogFooter>
                                        <Button ref={cancelRef} onClick={onClose}>
                                            Cancel
                                        </Button>
                                        <Button colorScheme='red' onClick={() => {
                                            deleteCustomer(id).then(res => {
                                                console.log(res)
                                                successNotification(
                                                    'Customer deleted',
                                                    `${name} was successfully deleted`
                                                )
                                                fetchCustomers();

                                            }).catch(err => {
                                                console.log(err);
                                                errorNotification(
                                                    err.code,
                                                    err.response.data.message
                                                )
                                            }).finally(() => {
                                                onClose()
                                            })
                                        }} ml={3}>
                                            Delete
                                        </Button>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialogOverlay>
                        </AlertDialog>
                    </Stack>

                </Stack>
            </Box>
        </Center>
    );
}