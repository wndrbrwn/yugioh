import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { JsonRpcSigner } from "ethers";
import { Dispatch, FC, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { useMetamask } from "../lib";
import Logo from "/images/Logo.png";
interface HeaderProps {
  signer: JsonRpcSigner | null;
  setSigner: Dispatch<SetStateAction<JsonRpcSigner | null>>;
}

const navLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Mint",
    path: "/mint",
  },
  {
    name: "Slot",
    path: "/slot",
  },
  
  {
    name: "My",
    path: "/my",
  },
  
  {
    name: "Card",
    path: "/card",
  },

  {
    name: "Sale",
    path: "/sale",
  },
];

const Header: FC<HeaderProps> = ({ signer, setSigner }) => {
  const navigate = useNavigate();

  const onClickLogOut = () => {
    setSigner(null);
  };

  return (
    <Flex h={20} justifyContent="space-between" alignItems="center" px={4} backgroundColor="black">
      <Flex w={125} >
      <img className="w-[108px]" src={Logo} alt="YUGIOH" />
      </Flex>
      <Flex display={["none", "none", "flex"]} gap={8}>
        {navLinks.map((v, i) => (
          <Button
            key={i}
            variant="link"
            colorScheme="gray"
            onClick={() => navigate(v.path)}
          >
            {v.name}
          </Button>
        ))}
      </Flex>
      <Flex display={["none", "none", "flex"]} w={40} justifyContent="end">
        {signer ? (
          <Menu>
            <MenuButton
              colorScheme="gray"
              as={Button}
              rightIcon={<ChevronDownIcon />}
            >
              {signer.address.substring(0, 7)}...
            </MenuButton>
            <MenuList>
              <MenuItem onClick={onClickLogOut}>Log out</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Button colorScheme="purple" onClick={() => useMetamask(setSigner)}>
            🦊 Log In
          </Button>
        )}
      </Flex>
      <Flex display={["flex", "flex", "none"]}>
        <Menu>
          <MenuButton
            colorScheme="gray"
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            {signer ? `${signer.address.substring(0, 7)}...` : "메뉴"}
          </MenuButton>
          <MenuList>
            {!signer && (
              <MenuItem onClick={() => useMetamask(setSigner)}>
                🦊 Log In
              </MenuItem>
            )}
            {navLinks.map((v, i) => (
              <MenuItem key={i} onClick={() => navigate(v.path)}>
                {v.name}
              </MenuItem>
            ))}
            {signer && <MenuItem onClick={onClickLogOut}>Log Out</MenuItem>}
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default Header;