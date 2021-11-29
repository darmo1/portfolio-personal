import React from 'react'
import { useAuthContext } from '../../auth-context'

export const NumeroRegistro = ({data}) => {

    const {numberRegister , setNumberRegister, setNumberPage, numberPage }  = useAuthContext()
    // const [ numeroDatos, setNumeroDatos] = React.useState()

    // React.useEffect( () => {
    //    setNumeroDatos ((data.length )/ numberRegister )
    // }, [numberRegister , data, numberPage])

  

    const handleReset = () => {
        setNumberPage(0)
    }
    const handlePrev = () => {
        setNumberPage( prev => Math.max(  prev - 1, 0  ))
    }
      
    const handleNext = () => { 
     
        //TODO: debo de ponerle un máximo, pero este me lo debe de dar el backend
        // setNumberPage( prev => Math.min(  prev + 1,  numeroDatos ))
        setNumberPage( prev => prev + 1 )
       
    }

    const handleSelect = (e) => {
     
        setNumberRegister( e.target.value ) 
        setNumberPage(0)
  
    }
   
    return (

        <div className='flex justify-between my-4'>
            <div>
            Mostrar 
            <select name="registro" id="registro"  value={numberRegister} onChange={
                handleSelect
            } > 
                <option value="1"> 1 </option>  
                <option value="10"> 10 </option>
                <option value="20"> 20 </option> 
                <option value="50"> 50 </option>
                <option value="100"> 100 </option>
            </select>
            &nbsp;
            registros 
            </div>

            <div>
                <button onClick={handleReset} className='border py-1 px-2 mr-2 text-center rounded-lg'>{` << `}</button>
                <button onClick={handlePrev} className='border py-1 px-2 mr-2 text-center rounded-lg'> {` < `}  </button>
                <button onClick={handleNext} className='border py-1 px-2 mr-2 text-center rounded-lg'>  {` Siguiente ${numberPage + 1}` }  </button>
            </div>
        </div>
    )
}
