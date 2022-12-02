import { ReactNode, useEffect, useState } from "react";

type Props = {
  selectedId: string;
  onClick: (id: string) => void;
  children: string;
  id?: string;
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
        required
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
          border: "1px solid #db9f05",
          ...(props.selectedId === id && {
            color: "white",
            backgroundColor: "#db9f05",
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
