/*
- Can validate your data by implementing functions dedicates to a vaildate state
- Then use these functions to validate data in your backend
- easier to 

*/
export function isNameValid(name: string) {
   return name.length > 5 && name.endsWith("!") && name.includes(" ")
}