/* eslint-disable @next/next/no-img-element */
import { IImageInput } from "@/apis/image";
import classNames from "classnames";
import { indexOf } from "lodash";
import React, { ChangeEvent } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Button from "./Button";
import Modal from "./Modal";

type Props = {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  images: Array<string>;
  uploadImage?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  deleteImage?: (imageIndex: number) => void;
};

const ImageList: React.FC<Props> = ({
  className,
  images,
  uploadImage,
  deleteImage: _deleteImage,
}) => {
  const [selectedImage, setSelectedImage] = React.useState("");
  const [modal, setModal] = React.useState(false);

  return (
    <div
      className={classNames(
        "w-full border rounded lg:p-4 p-1 flex flex-row flex-wrap lg:gap-4 gap-2 justify-center lg:justify-start",
        className
      )}
    >
      {images.map((image, index) => (
        <>
          {!image ? (
            <div
              key={index}
              className="w-40 h-52 border rounded flex justify-center items-center"
            >
              <AiOutlinePlus />
            </div>
          ) : (
            <img
              className="w-40 h-52 object-contain border rounded cursor-pointer"
              key={image}
              src={image}
              alt={"profile_ai_image"}
              onClick={handleImage(image)}
            />
          )}
        </>
      ))}
      {typeof uploadImage === "function" && (
        <label
          htmlFor="thumbnail_update"
          className="w-40 h-52 border rounded flex items-center justify-center cursor-pointer"
        >
          <AiOutlinePlus />
          <input
            className="hidden"
            id="thumbnail_update"
            type="file"
            multiple={false}
            onChange={uploadImage}
            accept="image/gif, image/jpeg, image/jpg, image/png"
          />
        </label>
      )}
      <Modal title="Gallery" isOpen={modal} closeModal={toggleModal}>
        <img
          className="w-60 h-full object-contain border rounded cursor-pointer"
          src={selectedImage}
          alt={"image"}
        />
        {typeof _deleteImage === "function" && (
          <Button
            className="w-20 h-10 mt-4 rounded"
            onClick={deleteImage(images.indexOf(selectedImage))}
          >
            삭제
          </Button>
        )}
      </Modal>
    </div>
  );

  function deleteImage(imageIndex: number) {
    return () => {
      if (typeof _deleteImage === "function") {
        _deleteImage(imageIndex);
      }
    };
  }

  function handleImage(image: string) {
    return () => {
      setSelectedImage(image);
      toggleModal();
    };
  }

  function toggleModal() {
    setModal(!modal);
  }
};

export default ImageList;
