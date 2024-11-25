// src/types/react-modal-image.d.ts
declare module "react-modal-image" {
  import React from "react";

  interface ModalImageProps {
    small: string;
    large: string;
    alt?: string;
    hideDownload?: boolean;
    hideZoom?: boolean;
    className?: string;
  }

  const ModalImage: React.FC<ModalImageProps>;
  export default ModalImage;
}
