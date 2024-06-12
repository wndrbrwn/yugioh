import {
  Box,
  Button,
  Flex,
  Grid,
  Image,
  Progress,
  Text,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { OutletContext } from "../components/Layout";
import PuzzleCard from "../components/PuzzleCard";

const Home: FC = () => {
  const [mintedList, setMintedList] = useState<number[]>([]);
  const [progress, setProgress] = useState<number>(0);

  const { signer, mintContract } = useOutletContext<OutletContext>();

  const navigate = useNavigate();

  const getCheckNfts = async () => {
    try {
      if (!signer || !mintContract) return;

      const response = await mintContract.balanceOfNfts(signer.address);

      const temp = response.map((v: bigint) => Number(v));

      setMintedList(temp);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCheckNfts();
  }, [signer, mintContract]);

  useEffect(() => {
    if (mintedList.length === 0) return;

    const temp = mintedList.filter((v) => {
      if (v) {
        return v;
      }
    });

    setProgress((temp.length / mintedList.length) * 100);
  }, [mintedList]);

  return (
    <Flex flexDir="column" w="100%" mb={[10, 10, 20]}>
      <Flex
        flexDir="column"
        gap={[2, 2, 4]}
        color="blue.500"
        h={[20, 20, 40]}
        justifyContent="center"
        alignItems="center"
        fontWeight="semibold"
        fontSize={[24, 24, 48]}
      >
        <Text>Exodia the Forbidden One</Text>
        <Button
          variant="outline"
          colorScheme="blue"
          onClick={() => navigate("/mint")}
        >
          summon Exodia
        </Button>
      </Flex>
      <Flex
        flexDir="column"
        flexGrow={1}
        justifyContent="center"
        alignItems="center"
      >
        {signer ? (
          <>
            <Flex
              w={[200, 320, 640]}
              my={[4, 4, 8]}
              gap={[2, 2, 4]}
              alignItems="center"
            >
              <Text fontSize={[16, 16, 24]}>✡ summoning ✡</Text>
              <Progress hasStripe value={progress} h={[4, 4, 8]} flexGrow={1} />
            </Flex>
            <Grid templateColumns={"repeat(4, 1fr)"}>
              {mintedList.map((v, i) => (
                <PuzzleCard key={i} index={i} balance={v} />
                
              ))}
            </Grid>
          </>
        ) : (
          <Box pos="relative" w={[320, 320, 640]} mt={[4, 4, 8]}>
            <Box
              pos="absolute"
              top={0}
              left={0}
              w="100%"
              h="100%"
              bgColor="rgba(0,0,0,0.5)"
            />
            <Image src="/images/Exodia.png" alt="Exodia the Forbidden One" />
          </Box>
        )}
      </Flex>
      <Flex
       flexDir="column"
       gap={[2, 2, 1]}
       color="gray"
       h={[20, 20, 1100]}
       justifyContent="center"
       alignItems="center"
       
       fontSize={[2, 2, 20]}>
           ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢺⡟⠒⠒⠲⢦⣤⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢷⠀⠀⣄⡀⠀⠈⠉⠓⠶⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⡇⠀⢻⣿⣷⣤⣷⣦⣀⠀⠉⠳⣦⡀⠀⠀⠀⠀⠀⠀⠀⣀⣤⠶⠶⢶⡶⠟⠟⢻⣿⠆⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⡀⠈⣿⣿⣿⣿⣿⣿⣷⣤⡀⠈⠙⢶⡀⢀⣀⡤⠞⠛⢁⣀⣤⣴⡿⠃⠀⢠⡟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⣀⣀⣀⠀⠀⠀⠀⢠⣶⣶⡀⠀⠀⠸⡇⠀⢻⣿⣿⣿⣿⣿⣿⣿⣿⣶⣄⠀⠙⠛⢁⣠⣴⣾⣿⣿⣿⣿⣾⠁⢀⡾⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣴⡏⠉⠹⣧⠀⠀⠀⠘⠛⠛⠃⠀⠀⠀⢻⠀⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣤⣴⣿⣿⣿⣿⣿⣿⣿⣿⠁⠀⣼⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠙⢧⣄⣼⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡄⠀⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⣿⠋⢸⣿⣿⠃⠀⣰⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⡤⠤⠴⠾⠃⠀⣨⣿⡏⠻⢿⣿⣿⣿⣿⣿⣿⣿⣿⠋⠀⣿⠀⢸⣿⡟⠀⢠⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣀⣤⠴⠛⠋⠁⠀⠀⠀⠀⠀⣀⣀⣿⠀⢻⡀⠀⠈⠛⢿⣿⣿⣿⣿⢹⠆⠀⣿⠀⢸⣿⣇⣀⡾⠤⣄⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢠⣴⠞⠋⠀⣀⣀⣤⣤⣴⣶⣶⣿⣿⣿⣿⣿⡄⠈⣧⠀⠀⢶⣤⣝⣿⠃⢸⢸⠀⠀⢿⡀⠘⠛⠉⠁⠀⣀⣀⣉⣳⣦⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠻⢧⣤⠀⠘⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⢷⣀⣽⠆⠀⠀⣿⠛⠛⣻⠈⢿⡇⠀⠈⠛⠲⢤⣤⣶⣯⣉⠛⠓⢦⣍⡉⠛⠒⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠈⠙⠳⣤⡈⠻⢿⣿⣿⣿⣿⣿⣿⠇⣤⠞⠉⠀⠀⠀⢀⣸⡇⠀⢸⠀⣾⣶⣿⣷⠦⣄⠀⠙⢿⣿⣿⣷⣶⣄⡈⠙⣶⣄⠀⠀⠀⠀⠀⠀⠀
⢰⣟⣿⠆⠀⠀⠀⠀⠙⢦⣀⠙⠿⣿⣿⣿⣿⠀⣿⠀⠀⣠⣴⡿⠿⢿⡳⠟⢿⣾⣿⠋⠀⠘⣧⠈⣿⣦⣀⠙⢿⣿⡿⣟⣥⠞⠛⠁⠀⠀⠀⠀⠀⠀⠀
⠀⠉⠉⠀⠀⠀⠀⠀⠀⠀⠘⣷⡤⠉⣻⡟⣻⠀⠹⡄⠀⢹⡟⠀⠀⠀⢻⡆⠘⠇⣿⠀⠀⠀⠈⡇⣿⠛⣿⣷⣦⣽⣿⡋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣠⡴⠊⠁⣠⣴⠋⣠⣿⠀⢸⣧⠀⢸⠀⠀⠀⠀⡤⣷⠀⠀⢿⠷⠀⠀⠀⡇⣿⠀⣿⡿⠋⠉⠙⢿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢀⣤⠞⢉⣤⣶⣿⣿⣧⣾⣿⣿⠀⣿⢸⡀⢿⠀⠀⠀⠀⣁⣤⡴⠺⣶⠖⠲⢦⡴⠗⣿⢀⡟⠀⠀⠀⠀⠀⠈⠻⠄⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠿⠷⢤⣬⣉⣉⣿⡿⠿⢿⣿⣿⢠⣿⠈⣇⢛⠻⠶⢒⠋⠉⢀⣀⣠⡿⠶⢾⣿⣶⡆⣿⣯⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⠋⠛⠳⠶⠦⣿⣼⣿⣿⣿⣸⢀⡞⠛⠛⠉⠉⠀⠀⠀⠀⠀⠘⢿⣾⡿⣋⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⣿⣯⣿⣿⣿⣿⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣿⣋⡈⠛⠛⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠁⢿⡄⠀⠀⣽⡟⢿⣿⣲⣤⣤⣤⣤⣤⣴⡟⠛⢿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⣶⣾⣷⡶⠾⠟⠂⠀⠈⣿⣿⣟⢠⣥⣾⣿⡇⠀⣾⡿⣿⠶⢶⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⡏⠀⠀⠀⠈⠀⠀⠀⠀⠘⣿⣿⣿⡸⠿⠿⣿⣿⣤⣿⣉⡀⠀⠀⢻⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⡇⡀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠛⢻⣿⠏⠀⠀⢿⡀⠈⠙⣿⡀⠀⠀⠻⢦⣤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣶⠾⠿⠿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣧⠀⣠⠼⠓⢦⣄⣿⣧⡤⠀⠀⠀⢻⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣶⠆⠀⠈⢹⡟⠀⣹⡿⠛⠋⠉⠉⠻⢻⣦⠀⠁⠠⣟⣻⣦⣄⣀⣀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⣴⡿⠃⠀⠀⠘⢸⡇⠿⠵⣶⠞⠉⣱⠀⠀⠀⠙⢿⣶⣶⣿⣿⣿⣿⣿⣿⣿⣦⣀⡀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⣿⣅⣀⣴⠿⠛⠷⢶⣤⣤⣶⠾⢿⡿⠀⠀⠀⠀⢸⣧⠀⣼⢁⣠⠞⢁⡀⢀⠀⠀⠈⠛⣿⣿⢻⣿⡛⣿⠀⢀⠈⠙⢿⡄⠀
⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⣿⣿⠏⢀⣦⣤⣀⡈⠙⣳⣤⡾⠃⠀⠀⠀⢠⠈⣿⣰⣧⡾⡏⣼⡾⢀⣾⡀⠀⠀⠀⣿⣿⡘⠛⢃⣿⠇⠀⠀⠀⢸⣷⠀
⠀⠀⠀⢀⣴⣿⣯⣿⠛⣿⠿⣿⡏⠀⢀⡍⠛⠫⣍⠽⣿⠋⡄⠀⠀⠀⠀⠀⡀⣽⣿⣯⠼⣷⢻⣅⣾⡏⠿⣦⣤⣴⣿⢹⣿⣿⣿⡇⠀⠀⢀⣠⣼⡿⠃
⠀⠀⠀⠾⣿⣟⠃⣿⡘⠛⢠⣿⣇⠀⠀⠙⠶⣤⡙⢦⣿⡀⠀⡀⠀⠀⢀⣴⢿⡟⠛⠛⠲⠾⠶⠿⠿⢷⣶⣿⣿⣿⣧⣼⣿⡿⠿⠷⠛⠛⠛⠉⠁⠀⠀
⠀⠀⠀⠀⠸⣿⣇⠹⣿⣿⣿⡋⣿⣄⠐⠦⣄⣈⣙⣻⣿⡇⠠⠀⠀⢀⣾⠋⠀⢷⠀⠀⢠⡶⠒⣦⠀⢀⣼⢿⣿⠈⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠈⠻⠶⠿⢿⣿⡷⢾⣿⠟⠛⠒⠞⠀⣸⡟⠀⠀⠀⠀⠸⣧⡀⠀⠈⣇⠀⠋⠀⠓⡈⠀⣾⠟⠣⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠛⠛⠻⠷⠶⠶⠤⢨⣿⡦⣄⢘⣇⠈⢛⠛⢃⣼⡟⠀⣠⢽⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀</Flex>
    </Flex>
  );
};

export default Home;