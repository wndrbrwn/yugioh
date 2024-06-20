import { Flex, Grid, Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { OutletContext } from "../components/Layout_Yugioh";
import SaleNftCard_Slot from "../components/SaleNftCard_Slot";


const SaleNft: FC = () => {
  const [tokenIds, setTokenIds] = useState<number[]>([]);

  const { signer, saleContract, mintContract } =
    useOutletContext<OutletContext>();

  const navigate = useNavigate();

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

  useEffect(() => {
    if (!saleContract) return;

    getOnSaleTokens();
  }, [saleContract]);

  return (
    <>
      <Flex position="absolute" top="20px" left="20px" gap={6} color="#101010">
        <Flex
          flexDir="column"
          alignItems="center"
          onClick={() => navigate("/")}
          cursor="pointer"
        >
          
        </Flex>
      </Flex>
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
            {tokenIds.map((v, i) => (
              <SaleNftCard_Slot
                key={i}
                tokenId={v}
                mintContract={mintContract}
                saleContract={saleContract}
                signer={signer}
                tokenIds={tokenIds}
                setTokenIds={setTokenIds}
              />
            ))}
          </Grid>
        ) : (
          <Text>🦊 메타마스크 로그인이 필요합니다!</Text>
        )}
      </Flex>
    </>
  );
};

export default SaleNft;