import { Box, Button, Flex, Image as ImageComponent } from "@chakra-ui/react";
import { FC, SetStateAction, useEffect, useRef, useState } from "react";
import axios from "axios";
interface Data {
  image: string;
  percent: number;
}

interface PrepareCanvasArgs {
  skin: string;
  face: string;
  hair: string;
}



const prepareCanvas = ({ skin, face, hair }: PrepareCanvasArgs) => {
  const canvas1: HTMLCanvasElement | null = document.querySelector("#canvas-1");

  if (!canvas1) return;
  const canvasContext = canvas1.getContext("2d");
  canvasContext?.clearRect(0, 0, 400, 600);
  const img3 = new Image();
  img3.src = "/src/assets/layer/" + skin + ".png";
  img3.onload = () => {
    canvasContext?.drawImage(img3, 0, 0, 400, 550);

    const img1 = new Image();
    img1.src = "/src/assets/layer/" + face + ".png";
    img1.onload = () => {
      canvasContext?.drawImage(img1, 0, 0, 400, 550);
    };
    const img2 = new Image();
    img2.src = "/src/assets/layer/" + hair + ".png";
    img2.onload = () => {
      canvasContext?.drawImage(img2, 0, 0, 400, 550);
    };
  };
};

const skinDataList: Data[] = [
  { image: "skin-1", percent: 25 },
  { image: "skin-2", percent: 25 },
  { image: "skin-3", percent: 25 },
  { image: "skin-4", percent: 25 },
];

const faceDataList: Data[] = [
  { image: "face-1", percent: 20 },
  { image: "face-2", percent: 20 },
  { image: "face-3", percent: 20 },
  { image: "face-4", percent: 20 },
  { image: "face-5", percent: 20 },
];
const hairDataList: Data[] = [
  { image: "hair-1", percent: 25 },
  { image: "hair-2", percent: 25 },
  { image: "hair-3", percent: 25 },
  { image: "hair-4", percent: 25 },
];

//이건 지워질 예정 -> 솔리디티에서 활용
const getRandomList = (dataList: Data[]) => {
  let list: string[] = [];
  for (const item of dataList) {
    const temp = Array(item.percent).fill(item.image);
    list = [...list, ...temp];
  }

  return list;
};

const Slot: FC = () => {
  const [skinRandomList, setSkinRandomList] = useState<Data[]>(skinDataList);
  const [faceRandomList, setFaceRandomList] = useState<Data[]>(faceDataList);
  const [hairRandomList, setHairRandomList] = useState<Data[]>(hairDataList);
  const [selectedFace, setSelectedFace] = useState("face-1");
  const [selectedSkin, setSelectedSkin] = useState("skin-1");
  const [selectedHair, setSelectedHair] = useState("hair-1");

  const [isLoop, setIsLoop] = useState<boolean>(false);
  // const [isStop, setIsStop] = useState<boolean>(false);
  const canvasRef = useRef<any>(null);
  const shuffle = (
    setList: React.Dispatch<SetStateAction<Data[]>>,
    selected: string
  ) => {
    setList((prev) => {
      const arr = [...prev];

      for (const i in Array(arr.length).fill(0)) {
        const randomIndex = Math.floor(Math.random() * (arr.length - 1));
        const temp = arr[i];
        arr[i] = arr[randomIndex];
        arr[randomIndex] = temp;
      }

      const selectedIndex = arr.findIndex((item) =>
        item.image.includes(selected)
      );
      const temp = arr[2];
      arr[2] = arr[selectedIndex];
      arr[selectedIndex] = temp;

      return arr;
    });
  };

  const getAllRandom = () => {
    shuffle(setFaceRandomList, selectedFace);
    shuffle(setHairRandomList, selectedHair);
    shuffle(setSkinRandomList, selectedSkin);
  };



  const onClickSlot = async () => {
    try {

      await setIsLoop(true);

    } catch (error) {
      console.error(error);
    }
  };

  const onClickReveal = async () => {
    try {


      getAllRandom();
      setIsLoop(false);

      pick();
    } catch (error) {
      console.error(error);
    }
  };
  const dataURLToBlob = (dataURL:any) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };
  const uploadImage = async (formData: FormData) => {
    try {
      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            pinata_api_key: import.meta.env.VITE_PINATA_KEY,
            pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET,
          },
        }
      );

      return `https://slime-project.mypinata.cloud/ipfs/${response.data.IpfsHash}`;
    } catch (error) {
      console.error(error);
    }
  };


  const saveImage = async() => {
    const canvas = canvasRef.current;
    const dataURL = canvas?.toDataURL('image/png');
    const blob = dataURLToBlob(dataURL);
  const file = new File([blob], 'canvas-image.png', { type: 'image/png' });
  const formData = new FormData();

  formData.append("file", file);

  const imageUrl = await uploadImage(formData);

    // const link = document.createElement('a');
    // link.href = dataURL;
    // link.download = 'canvas-image.png';
    // link.click();
  };

  useEffect(() => {
    getAllRandom();
    prepareCanvas({
      skin: selectedSkin,
      face: selectedFace,
      hair: selectedHair,
    });
  }, [selectedFace, selectedSkin, selectedHair]);

  const pick = () => {
    const skinList = getRandomList(skinDataList);
    const faceList = getRandomList(faceDataList);
    const hairList = getRandomList(hairDataList);

    const skinIndex = Math.floor(Math.random() * (skinList.length - 1));
    const faceIndex = Math.floor(Math.random() * (faceList.length - 1));
    const hairIndex = Math.floor(Math.random() * (hairList.length - 1));

    setSelectedSkin(skinList[skinIndex]);
    setSelectedFace(faceList[faceIndex]);
    setSelectedHair(hairList[hairIndex]);
  };



  return (
    <Flex flexDir={"column"} px={4} w="100%">
      
      <Flex flexDir={"row"} p={"12px"} gap="4" bg="yellow.100" w="100%" h={300}>
        <Box minW={200} w={200} overflow={"hidden"}>
          <Flex
            flexDir={"column"}
            className={`slot ${isLoop ? "loop" : "stop"}`}
          >
            <ImageComponent
              src={`/src/assets/layer/${skinRandomList[0].image}.png`}
            />
            <ImageComponent
              src={`/src/assets/layer/${skinRandomList[1].image}.png`}
            />
            <ImageComponent
              src={`/src/assets/layer/${skinRandomList[2].image}.png`}
            />
          </Flex>
        </Box>
        <Box minW={200} w={200} overflow={"hidden"}>
          <Flex
            flexDir={"column"}
            className={`slot ${isLoop ? "loop" : "stop"}`}
          >
            <ImageComponent
              src={`/src/assets/layer/${faceRandomList[0].image}.png`}
            />
            <ImageComponent
              src={`/src/assets/layer/${faceRandomList[1].image}.png`}
            />
            <ImageComponent
              src={`/src/assets/layer/${faceRandomList[2].image}.png`}
            />
            <ImageComponent
              src={`/src/assets/layer/${faceRandomList[3].image}.png`}
            />
            <ImageComponent
              src={`/src/assets/layer/${faceRandomList[4].image}.png`}
            />
          </Flex>
        </Box>
        <Box minW={200} w={200} overflow={"hidden"}>
          <Flex
            flexDir={"column"}
            className={`slot ${isLoop ? "loop" : "stop"}`}
          >
            <ImageComponent
              src={`/src/assets/layer/${hairRandomList[0].image}.png`}
            />
            <ImageComponent
              src={`/src/assets/layer/${hairRandomList[1].image}.png`}
            />
            <ImageComponent
              src={`/src/assets/layer/${hairRandomList[2].image}.png`}
            />
            <ImageComponent
              src={`/src/assets/layer/${hairRandomList[3].image}.png`}
            />
          </Flex>
        </Box>
      </Flex>
      <Button onClick={onClickSlot}>Pull the Slot</Button>
      <Button onClick={onClickReveal}>Stop</Button>

      <Flex
        flexDir={"column"}
        bg="orange.100"
        py={10}
        alignItems={"center"}
        justifyContent={"center"}
      >

        <Box bg="green.100" w="400px" h="550px">
            
          <canvas ref={canvasRef} id="canvas-1" width={"400px"} height={"550px"}></canvas>
        </Box>
        <Flex w="400px" py={5} gap={2}>
          <Button onClick={saveImage} w="100%">Mint</Button>
          <Button onClick={onClickSlot} w="100%">Retry</Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Slot;
