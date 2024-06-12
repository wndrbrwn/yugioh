import { Flex } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "./Layout";
import axios from "axios";

interface NftCardProps {
  tokenId: number;
  amount: number;
}

const NftCard: FC<NftCardProps> = ({ tokenId, amount }) => {
  const [stsNftMetadata, setStsNftMetadata] = useState<StsNftMetadata>();

  const { mintContract } = useOutletContext<OutletContext>();

  const getNftMetadata = async () => {
    try {
      if (!mintContract || !tokenId) return;

      const response = await axios.get<NftMetadata>(
        `${import.meta.env.VITE_METADATA_URI}/${tokenId}.json`
      );

      setStsNftMetadata({
        ...response.data,
        tokenId,
        amount,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNftMetadata();
  }, [mintContract, tokenId]);

  useEffect(() => console.log(stsNftMetadata), [stsNftMetadata]);

  return <Flex>NftCard</Flex>;
};

export default NftCard;