import Layout from '../components/Layout'
import SmallCard from '../components/SmallCard'

const Home = () => {

  return (
    <>
     <h2>Dashboard</h2>
     <SmallCard title='Clientes' subtitle='12'/>
     <SmallCard title='Pedidos' subtitle='12' color='#E6A10A'/>
     <SmallCard title='Entregues' subtitle='12' color='#14D428'/>
     <SmallCard title='Pendentes' subtitle='12' color='#E01F27'/>
    </>
  )
}

Home.layout = Layout;

export default Home
