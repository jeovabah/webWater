import { PixData } from "../../Home";

interface PixProps {
  pix: PixData;
}

export const Pix = ({ pix }: PixProps) => {
  return (
    <div>
      <h1>Pix ID: {pix.id}</h1>
      <img src={pix.qrCode} alt="QR Code" />
    </div>
  );
};
