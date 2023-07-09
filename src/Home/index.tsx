import React, { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { Pix } from "../Components/Pix";
import { usePix } from "../Contexts/Pix";

export interface PixData {
  id: string;
  qrCode: string;
}

interface PixStatusData {
  isPaid: boolean;
  hasExpired: boolean;
}

export const Home: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [pix, setPix] = useState<PixData | null>(null);
  const { generatePix } = usePix();

  useEffect((): (() => void) => {
    const newSocket = io("http://localhost:8081");
    setSocket(newSocket);

    newSocket.on("pix", (data: PixData) => {
      setPix(data);
    });

    newSocket.on("pixStatus", (data: PixStatusData) => {
      console.log("O pagamento foi efetuado:", data.isPaid);
      console.log("O pagamento expirou:", data.hasExpired);
      setPix(null);
    });

    return () => newSocket.close();
  }, []);

  const handleGenerate = async () => {
    generatePix((data) => {
      socket?.emit("generatePix", data);
    });
  };

  // useEffect(() => {
  //   if (!pix) {
  //     generatePix();
  //   }
  // }, [pix]);

  return (
    <div>
      {pix ? (
        <Pix pix={pix} />
      ) : (
        <button onClick={handleGenerate}>Gerar Pix</button>
      )}
    </div>
  );
};
