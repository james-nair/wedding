import { ReactNode, useEffect, useState } from "react";

type Props = {
  selectedId: string;
  onClick: (id: string) => void;
  children: string;
  id?: string;
  hasBorder?: boolean;
};

export const SelectButton = (props: Props) => {
  const [id, setId] = useState("");

  useEffect(() => setId(props.id ?? props.children.toString()), [props.id]);
  return (
    <>
      <input
        id={`select-${id}`}
        name="rsvp"
        value={"yes"}
        type="radio"
        style={{
          position: "absolute",
          opacity: 0,
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
      <label
        style={{
          padding: "1rem 2rem",
          ...(props.hasBorder && { border: "1px solid #121212" }),

          ...(props.selectedId === id && {
            color: "white",
            backgroundColor: "#121212",
          }),
          cursor: "pointer",
        }}
        onClick={() => {
          props.onClick(id);
        }}
      >
        {props.children}
      </label>
    </>
  );
};
