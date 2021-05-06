import { IconButton } from "@chakra-ui/button";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { useToast } from "@chakra-ui/toast";
import { useRouter } from "next/router";
import { BsFillPersonFill } from 'react-icons/bs'
import useAuth from "../hooks/useAuth";

const ProfileMenu = () => {
    const { user, signOut, sendEmailVerification } = useAuth()
    const { push } = useRouter()
    const toast = useToast()
    const handleEmailVerified = () => {
        try {
            sendEmailVerification()
            toast({
                title: "Enviado para " + user.email,
                description: "Verifique seu email.",
                status: "success",
                position: "bottom-left",
                duration: 10000,
                isClosable: true,
            })
        } catch (error) {
            toast({
                title: "Algo deu errado",
                description: error.message,
                status: "success",
                position: "bottom-left",
                duration: 10000,
                isClosable: true,
            })
        }
    }
    return (
        <Menu>
            <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={user.photoURL ? user?.photoURL : <BsFillPersonFill />}
                rounded="full"
            />
            <MenuList>
                <MenuItem onClick={() => { push("/dashboard/user") }}>
                    {user.displayName ? user.displayName : "User"}
                </MenuItem>
                <MenuItem onClick={signOut}>
                    Sign Out
                </MenuItem>
                {!user.emailVerified ? < MenuItem color="red" onClick={handleEmailVerified}>
                    Comfirma Email
                </MenuItem> : <></>}
            </MenuList>
        </Menu >
    )
}
export default ProfileMenu