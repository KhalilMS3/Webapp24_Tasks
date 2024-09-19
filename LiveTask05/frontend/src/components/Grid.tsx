import { useState } from "react";
import Student from "./Student";
import { student as StudentProps } from "./types";
import AddStudentForm from "./AddStudentForm";

type GridProps = {
   students: StudentProps[]

}

export default function Grid(props: GridProps) {
   const [students, setStudents] = useState<StudentProps[]>(props.students ?? [])
   
   const onAddStudent = (student: {name: string}) => {
      setStudents((prev) => [...prev, {id: crypto.randomUUID(), ...student}])
   }
   return (
      <section>
      < article className = "grid" >
      {students.map((student) => (
      <Student key={student.id} id={student.id} name={student.name} />
      ))}
   </article>
   <AddStudentForm onAddStudent={onAddStudent}/>
   
   </section>
)

}
