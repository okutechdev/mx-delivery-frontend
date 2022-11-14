import { GetServerSideProps } from 'next'
import Layout from '../components/Layout'
import SmallCard from '../components/SmallCard'
import { api } from '../services/api'


type HomeProps = {
  custumers: number
  products: number
  orders: number
}


const Home = ({ custumers, orders, products }: HomeProps) => {

  return (
    <>
      <h2>Dashboard</h2>
      <SmallCard title='Pedidos' subtitle={orders} color='#E6A10A' />
      <SmallCard title='Clientes' subtitle={custumers} />
      <SmallCard title='Produtos' subtitle={products} color='#14D428' />
    </>
  )
}

Home.layout = Layout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const token = ctx.req.cookies['%40mxtoken'];
  api.defaults.headers.common.Authorization = `Bearer ${token}`

  const { data: custumers } = await api.get<[]>('/custumers');
  const { data: products } = await api.get<[]>('/products');
  const { data: orders } = await api.get<[]>('/orders');

  return {
    props: {
      custumers: custumers.length,
      products: products.length,
      orders: orders.length
    }
  }

}


export default Home
