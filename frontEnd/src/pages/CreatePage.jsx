import { Container, VStack, Heading, Box, useColorModeValue, Button} from "@chakra-ui/react"
import  { useState } from 'react'
import { useProductStore } from '../store/product'
import { useToast } from '@chakra-ui/react'




const CreatePage = () => {

  const [newProduct, setNewProduct] = useState({

      name: "" ,
      price: "" ,
      image: "" ,
  })
  
  const toast = useToast()
  const { createProduct } = useProductStore()

  const handleAddProduct = async ()=>{
     const { success, message } = await createProduct(newProduct);

     if(!success){
      toast({
        title:'Error',
        description: message,
        status: 'error',
        isClosable: true,
      })
     }else{
      toast({
        title:'Success',
        description: message,
        status: 'success',
        isClosable: true,
      })
     }
     console.log('success:', success);
     console.log('message:', message);
     setNewProduct({name:"", price:"", image:""})
  }
  return (
    <Container maxW={'container.sm'}>
      <VStack spacing={8}>
        <Heading as={'h1'} size={'2x1'} textAlign={'center'} mb={8}>
            Create New Product
        </Heading>
        <Box w={'full'} bg={useColorModeValue('white', 'gray.800')}
          p={6}  rounded={'lg'} shadow={'md'}
        >
          <VStack spacing={4}>
             <input width={'full'}
                placeholder="Input Name"
                name="name"
                value={newProduct.name}
                onChange={(e)=> setNewProduct({...newProduct, name: e.target.value})}
             />
             <input width={'full'}
                placeholder="Price"
                name="price"
                type="number"
                value={newProduct.price}
                onChange={(e)=> setNewProduct({...newProduct, price: e.target.value})}
             />
             <input width={'full'}
                placeholder="Image URL"
                name="image"
                value={newProduct.image}
                onChange={(e)=> setNewProduct({...newProduct, image: e.target.value})}
             />
             <Button onClick={handleAddProduct} colorScheme="blue" w={'full'}>
                 Add Product
             </Button>
          
          </VStack>
          
        
        </Box>
      
      </VStack>
      
    </Container>
  )
}

export default CreatePage