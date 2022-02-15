import { GetServerSideProps } from 'next'
import Layout from '../components/Layout'
import SmallCard from '../components/SmallCard'
import { api } from '../services/api'


type ItemProps = {
  id: number
}

type OrderProps = {
  id: number
  status: string
}

type HomeProps = {
  custumers: number
  products: number
  orders: OrderProps[]
}


const Home = () => {

  return (
    <>
     <h2>Dashboard</h2>
     <SmallCard title='Clientes' subtitle={12}/>
     <SmallCard title='Pedidos' subtitle={12} color='#E6A10A'/>
     <SmallCard title='Produtos' subtitle={12} color='#14D428'/>
     <SmallCard title='Entregues' subtitle={12} color='#14D428'/>
     <SmallCard title='Pendentes' subtitle={12} color='#E01F27'/>
    </>
  )
}

Home.layout = Layout;

export default Home
