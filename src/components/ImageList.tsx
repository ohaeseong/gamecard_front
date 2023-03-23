/* eslint-disable @next/next/no-img-element */
import classNames from "classnames";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Button from "./Button";
import Modal from "./Modal";

type Props = {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  images: Array<string | null>;
  uploadImage?: (
    event: React.ChangeEvent<HTMLInputElement>,
    index?: number
  ) => void;
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
        "w-full bg-zinc-800 lg:p-4 p-1 flex flex-row flex-wrap lg:gap-4 gap-2 justify-center lg:justify-start",
        className
      )}
    >
      {images.map((image, index) => (
        <div key={index}>
          {!image ? (
            <label className="w-40 h-52 flex items-center border border-zinc-600 justify-center cursor-pointer">
              <AiOutlinePlus color="#ffffff" />
              {typeof uploadImage === "function" && (
                <input
                  className="hidden"
                  type="file"
                  multiple={false}
                  onChange={(event) => uploadImage(event, index)}
                  accept="image/gif, image/jpeg, image/jpg, image/png"
                />
              )}
            </label>
          ) : (
            <img
              className="w-40 h-52 object-contain border border-zinc-600 rounded p-2 cursor-pointer"
              key={image}
              src={image}
              alt={"profile_ai_image"}
              onClick={handleImage(image)}
            />
          )}
        </div>
      ))}
      {typeof uploadImage === "function" && images.length === 21 ? (
        <label
          htmlFor="thumbnail_update"
          className="w-40 h-52 border border-zinc-600 flex items-center justify-center cursor-pointer"
        >
          <AiOutlinePlus color="#ffffff" />
          <input
            className="hidden"
            id="thumbnail_update"
            type="file"
            multiple={false}
            onChange={uploadImage}
            accept="image/gif, image/jpeg, image/jpg, image/png"
          />
        </label>
      ) : (
        <div className="text-white h-[200px] flex justify-center items-center w-full">
          사진첩 기능 준비 중
        </div>
      )}
      <Modal title="갤러리" isOpen={modal} closeModal={toggleModal}>
        <img
          className="w-60 h-full object-contain my-4 rounded cursor-pointer"
          src={selectedImage}
          alt={"image"}
        />
        {typeof _deleteImage === "function" && (
          <Button
            className="w-20 h-10 mt-2 rounded"
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
        toggleModal();
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
