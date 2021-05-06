import { Button, ButtonGroup, IconButton } from "@chakra-ui/button"
import { Editable, EditableInput, EditablePreview, useEditableControls } from "@chakra-ui/editable"
import { Box, Flex, Stack } from "@chakra-ui/layout"
import Head from "next/head"
import { useEffect, useState } from "react"
import { FiCheckSquare, FiEdit } from "react-icons/fi"
import { MdClose } from "react-icons/md"
import useAuth from "../../hooks/useAuth"
import { UpdateProfile } from "../../interface"


const User = () => {
    const { user, updateProfile } = useAuth()
    const [editUser, setEditUser] = useState<UpdateProfile>()
    useEffect(() => {
        if (editUser) {
            console.log(editUser)
            updateProfile({ ...editUser })
        }
    }, [editUser])

    function EditableControls() {
        const {
            isEditing,
            getSubmitButtonProps,
            getCancelButtonProps,
            getEditButtonProps,
        } = useEditableControls()


        return isEditing ? (
            <ButtonGroup justifyContent="center" size="md" mx="2">
                <Button {...getSubmitButtonProps()} ><FiCheckSquare /></Button>
                <Button {...getCancelButtonProps()} ><MdClose /></Button>
            </ButtonGroup>
        ) : (
            <Flex justifyContent="center" mx="2">
                <Button size="md" {...getEditButtonProps()} ><FiEdit /></Button>
            </Flex>
        )
    }

    return (
        <>
            <Head>
                <title>User{user?.displayName ? " | " + user.displayName : ""}</title>
            </Head>
            <Stack spacing={6} m={["2rem","6rem"]} justifyContent="center">
                <Editable
                    textAlign="center"
                    defaultValue={user?.displayName ? user.displayName : "Defina um nome"}
                    fontSize={["xl","2xl"]}
                    isPreviewFocusable={false}
                    as={Flex}
                    justifyContent="center"
                    w="100%"
                    onSubmit={(value) => { setEditUser({ displayName: value }) }}
                >
                    <EditablePreview />
                    <EditableInput />
                    <EditableControls />
                </Editable>
                <Box as={Flex} justifyContent="center" fontSize={["xl","2xl"]} w="100%">{user?.email}</Box>
                <Button >On</Button>
            </Stack>
        </>
    )
}
export default User