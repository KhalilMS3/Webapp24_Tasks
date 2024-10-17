
import AddStudentForm from "./AddStudentForm";
import { PropsWithChildren } from "react";

type GridProps = {
   onAddStudent: ({ name }: { name: string }) => void; // Void does a logic bot does not return something
};

// Use PropsWithChildren to define that children will be used here, with that no need to define "children" as type
export default function Grid(props: PropsWithChildren<GridProps>) {
  const { onAddStudent, children} = props

   return (
      <section>
         {children}
      <AddStudentForm onAddStudent={onAddStudent}/>
   
   </section>
)

}
