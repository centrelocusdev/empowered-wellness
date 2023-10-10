import { useRef } from 'react'

function useRefArray(length, createRefFn) {
  const arrayRef = useRef(Array(length).fill(null).map(createRefFn))
  return arrayRef.current
}

export default useRefArray;
