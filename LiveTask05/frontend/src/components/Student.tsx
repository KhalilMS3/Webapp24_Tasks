import { useState } from "react";
import Avatar from "./Avatar";
import { Student as StudentProps } from "./types";

export default function Student(
  props: StudentProps & {
    onRemoveStudent: (id: string) => void;
  }
) {
  const [showRemove, setShowRemove] = useState(false);
  const { id, name, onRemoveStudent } = props;

  const updateShowState = () => {
    setShowRemove(true);
  };

  return (
    <div
      className="studentCard"
      onMouseOver={updateShowState}
      onMouseLeave={() => setShowRemove(false)}
    >
      <Avatar name={name} />
      <p className="student-name">{name}</p>
      {showRemove ? (
        <button type="button" onClick={() => onRemoveStudent(id)}>
          X
        </button>
      ) : null}
    </div>
  );
}
