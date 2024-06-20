import { Flex, Grid, Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../components/Layout";
import axios from "axios";
import SaleNftCard from "../components/SaleNftCard";

const SaleNft: FC = () => {
  const [tokenIds, setTokenIds] = useState<number[]>([]);
  const [nftMetadataArray, setNftMetadataArray] = useState<NftMetadata[]>([]);

  const { signer, saleContract, mintContract } =
    useOutletContext<OutletContext>();

  const getOnSaleTokens = async () => {
    try {
      const response = await saleContract?.getOnSaleTokens();

      const temp = response.map((v: any) => {
        return Number(v);
      });

      setTokenIds(temp);
    } catch (error) {
      console.error(error);
    }
  };

  const getNftMetadata = async () => {
    try {
      const temp = await Promise.all(
        tokenIds.map(async (v) => {
          const tokenURI = await mintContract?.tokenURI(v);

          const response = await axios.get<NftMetadata>(tokenURI);

          return response.data;
        })
      );

      setNftMetadataArray(temp);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!saleContract) return;

    getOnSaleTokens();
  }, [saleContract]);

  useEffect(() => {
    if (tokenIds.length === 0) return;

    getNftMetadata();
  }, [tokenIds]);

  useEffect(() => console.log(nftMetadataArray), [nftMetadataArray]);

  return (
    <Flex
      
      w="100%"
      alignItems="center"
      flexDir="column"
      gap={2}
      mt={8}
      mb={20}
    >
      {signer ? (
        <Grid
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
          ]}
          gap={6}
        >
           <text>팔지 못합니다</text>
        </Grid>
      ) : (
        <Text>🦊 You need to log in ! ! !</Text>
      )}
    </Flex>
  );
};

export default SaleNft;