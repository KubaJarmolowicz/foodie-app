"use client";

import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

type ImagePickerProps = {
  label: React.ReactNode;
  name: string;
};

export const ImagePicker = ({ label, name }: ImagePickerProps) => {
  const [pickedImage, setPickedImage] = useState<string | undefined | null>(
    undefined
  );
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image
              src={pickedImage}
              alt="The image selected by the user"
              fill
            />
          )}
        </div>
        <input
          onChange={(e) => {
            const image = e.target.files?.[0];
            if (!image) {
              return setPickedImage(undefined);
            }
            const fileReader = new FileReader();
            fileReader.onload = () => {
              setPickedImage(fileReader.result as string);
            };
            fileReader.readAsDataURL(image);
          }}
          ref={inputRef}
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          required
        />
        <button
          className={classes.button}
          type="button"
          onClick={() => inputRef.current?.click()}
        >
          Pick an image
        </button>
      </div>
    </div>
  );
};
