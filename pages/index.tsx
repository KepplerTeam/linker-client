import { useQuery } from '@apollo/client';
import { GET_USERS } from '../graphql/queries';
import { User } from '../models/index';

export default function Home() {
  // const { data, loading } = useQuery<{
  //   users: User[];
  // }>(GET_USERS, {
  //   fetchPolicy: 'network-only',
  // });
  // return (
  //   <div>
  //     {(loading && <div className="">Hello World</div>) ||
  //       data?.users.map((user) => (
  //         <h1>
  //           username: {user.username} id: {user._id}
  //         </h1>
  //       ))}
  //   </div>
  // );

  return (
    <div className="w-screen h-full p-0">
      <div className="nav p-3">
        <a className="flex items-center" href="#">
          <img className="h-7" src="./icons/menu-variant.svg" alt="Menu" />
        </a>
        <a className="mx-auto" href="#">
          <img className="h-8" src="./logo.svg" alt="Linker" />
        </a>
        <a className="flex items-center" href="#">
          <img className="h-7" src="./profile-pic.png" alt="Perfil" />
        </a>
      </div>


      <div className="w-full mt-3 p-6">
        <h4 className="text-lg font-light pb-2">Bienvenido, “username”</h4>
        <h1 className="text-3xl font-bold">¿Qué desea comprar hoy?</h1>
        <input className="input-text" type="text" name="search" id="search" placeholder="Buscar Productos"/>
      </div>

      <div className="card-home">
        <div className="nav scroll-x mb-4 pr-4">
          <button className="nav-item active">Construcci&oacute;n</button>
          <button className="nav-item">Comida</button>
          <button className="nav-item">Pl&aacute;stico</button>
          <button className="nav-item mr-0">Cart&oacute;n</button>
        </div>
        <div className="flex scroll-x mb-4">
          <div className="card flex items-center justify-between w-96 min-w-max mr-4">
            <div className="flex flex-col items-start h-full">
              <h2 className="text-2xl font-bold mb-auto">TMA-2 <br />Modular <br />Headphone</h2>
              <a href="#" className="nav-link">
                Shop Now
                <img className="ml-2 h-5" src="./icons/arrow-right.png" alt=">" />
              </a>
            </div>
            <img className="h-48" src="./TMA-2-Modular-Headphone.png" alt="" />
          </div>
          <div className="card flex items-center justify-between w-96 min-w-max mr-4">
            <div className="flex flex-col items-start h-full">
              <h2 className="text-2xl font-bold mb-auto">CO2 <br />Cable</h2>
              <a href="#" className="nav-link">
                Shop Now
                <img className="ml-2 h-5" src="./icons/arrow-right.png" alt=">" />
              </a>
            </div>
            <img className="h-48" src="./CO2-Cable.png" alt="" />
          </div>
          <div className="card flex items-center justify-between w-96 min-w-max mr-4">
            <div className="flex flex-col items-start h-full">
              <h2 className="text-2xl font-bold mb-auto">TMA-2 <br />Modular <br />Headphone</h2>
              <a href="#" className="nav-link">
                Shop Now
                <img className="ml-2 h-5" src="./icons/arrow-right.png" alt=">" />
              </a>
            </div>
            <img className="h-48" src="./TMA-2-Modular-Headphone.png" alt="" />
          </div>
          <div className="card flex items-center justify-between w-96 min-w-max mr-4">
            <div className="flex flex-col items-start h-full">
              <h2 className="text-2xl font-bold mb-auto">CO2 <br />Cable</h2>
              <a href="#" className="nav-link">
                Shop Now
                <img className="ml-2 h-5" src="./icons/arrow-right.png" alt=">" />
              </a>
            </div>
            <img className="h-48" src="./CO2-Cable.png" alt="" />
          </div>
          <div className="card flex items-center justify-between w-96 min-w-max mr-4">
            <div className="flex flex-col items-start h-full">
              <h2 className="text-2xl font-bold mb-auto">TMA-2 <br />Modular <br />Headphone</h2>
              <a href="#" className="nav-link">
                Shop Now
                <img className="ml-2 h-5" src="./icons/arrow-right.png" alt=">" />
              </a>
            </div>
            <img className="h-48" src="./TMA-2-Modular-Headphone.png" alt="" />
          </div>
          <div className="card flex items-center justify-between w-96 min-w-max mr-4">
            <div className="flex flex-col items-start h-full">
              <h2 className="text-2xl font-bold mb-auto">CO2 <br />Cable</h2>
              <a href="#" className="nav-link">
                Shop Now
                <img className="ml-2 h-5" src="./icons/arrow-right.png" alt=">" />
              </a>
            </div>
            <img className="h-48" src="./CO2-Cable.png" alt="" />
          </div>
          <div className="card flex items-center justify-between w-96 min-w-max mr-4">
            <div className="flex flex-col items-start h-full">
              <h2 className="text-2xl font-bold mb-auto">TMA-2 <br />Modular <br />Headphone</h2>
              <a href="#" className="nav-link">
                Shop Now
                <img className="ml-2 h-5" src="./icons/arrow-right.png" alt=">" />
              </a>
            </div>
            <img className="h-48" src="./TMA-2-Modular-Headphone.png" alt="" />
          </div>
          <div className="card flex items-center justify-between w-96 min-w-max mr-4">
            <div className="flex flex-col items-start h-full">
              <h2 className="text-2xl font-bold mb-auto">CO2 <br />Cable</h2>
              <a href="#" className="nav-link">
                Shop Now
                <img className="ml-2 h-5" src="./icons/arrow-right.png" alt=">" />
              </a>
            </div>
            <img className="h-48" src="./CO2-Cable.png" alt="" />
          </div>
          <div className="card flex items-center justify-between w-96 min-w-max mr-4">
            <div className="flex flex-col items-start h-full">
              <h2 className="text-2xl font-bold mb-auto">TMA-2 <br />Modular <br />Headphone</h2>
              <a href="#" className="nav-link">
                Shop Now
                <img className="ml-2 h-5" src="./icons/arrow-right.png" alt=">" />
              </a>
            </div>
            <img className="h-48" src="./TMA-2-Modular-Headphone.png" alt="" />
          </div>
          <div className="card flex items-center justify-between w-96 min-w-max mr-4">
            <div className="flex flex-col items-start h-full">
              <h2 className="text-2xl font-bold mb-auto">CO2 <br />Cable</h2>
              <a href="#" className="nav-link">
                Shop Now
                <img className="ml-2 h-5" src="./icons/arrow-right.png" alt=">" />
              </a>
            </div>
            <img className="h-48" src="./CO2-Cable.png" alt="" />
          </div>
        </div>
        <div className="flex justify-between mt-8 mb-2 pr-4">
          <h3 className="text-lg font-normal pb-2">Productos Destacados</h3>
          <a className="font-light text-gray-600 pb-2" href="#">Ver Todos</a>
        </div>
        <div className="flex scroll-x mb-4">
          <div className="card flex flex-col items-start w-56 min-w-max mr-4">
            <img className="h-48" src="./TMA-2-Modular-Headphone.png" alt="" />
            <h2 className="text-lg text-left font-normal mb-auto">TMA-2 HD Wireless</h2>
            <h3 className="text-lg text-left font-bold mb-auto">USD 350</h3>
          </div>
          <div className="card flex flex-col items-start w-56 min-w-max mr-4">
            <img className="h-48" src="./CO2-Cable.png" alt="" />
            <h2 className="text-lg text-left font-normal mb-auto">TMA-2 HD Wireless</h2>
            <h3 className="text-lg text-left font-bold mb-auto">USD 350</h3>
          </div>
          <div className="card flex flex-col items-start w-56 min-w-max mr-4">
            <img className="h-48" src="./TMA-2-Modular-Headphone.png" alt="" />
            <h2 className="text-lg text-left font-normal mb-auto">TMA-2 HD Wireless</h2>
            <h3 className="text-lg text-left font-bold mb-auto">USD 350</h3>
          </div>
          <div className="card flex flex-col items-start w-56 min-w-max mr-4">
            <img className="h-48" src="./CO2-Cable.png" alt="" />
            <h2 className="text-lg text-left font-normal mb-auto">TMA-2 HD Wireless</h2>
            <h3 className="text-lg text-left font-bold mb-auto">USD 350</h3>
          </div>
          <div className="card flex flex-col items-start w-56 min-w-max mr-4">
            <img className="h-48" src="./TMA-2-Modular-Headphone.png" alt="" />
            <h2 className="text-lg text-left font-normal mb-auto">TMA-2 HD Wireless</h2>
            <h3 className="text-lg text-left font-bold mb-auto">USD 350</h3>
          </div>
          <div className="card flex flex-col items-start w-56 min-w-max mr-4">
            <img className="h-48" src="./CO2-Cable.png" alt="" />
            <h2 className="text-lg text-left font-normal mb-auto">TMA-2 HD Wireless</h2>
            <h3 className="text-lg text-left font-bold mb-auto">USD 350</h3>
          </div>
          <div className="card flex flex-col items-start w-56 min-w-max mr-4">
            <img className="h-48" src="./TMA-2-Modular-Headphone.png" alt="" />
            <h2 className="text-lg text-left font-normal mb-auto">TMA-2 HD Wireless</h2>
            <h3 className="text-lg text-left font-bold mb-auto">USD 350</h3>
          </div>
          <div className="card flex flex-col items-start w-56 min-w-max mr-4">
            <img className="h-48" src="./CO2-Cable.png" alt="" />
            <h2 className="text-lg text-left font-normal mb-auto">TMA-2 HD Wireless</h2>
            <h3 className="text-lg text-left font-bold mb-auto">USD 350</h3>
          </div>
          <div className="card flex flex-col items-start w-56 min-w-max mr-4">
            <img className="h-48" src="./TMA-2-Modular-Headphone.png" alt="" />
            <h2 className="text-lg text-left font-normal mb-auto">TMA-2 HD Wireless</h2>
            <h3 className="text-lg text-left font-bold mb-auto">USD 350</h3>
          </div>
          <div className="card flex flex-col items-start w-56 min-w-max mr-4">
            <img className="h-48" src="./CO2-Cable.png" alt="" />
            <h2 className="text-lg text-left font-normal mb-auto">TMA-2 HD Wireless</h2>
            <h3 className="text-lg text-left font-bold mb-auto">USD 350</h3>
          </div>
          <div className="card flex flex-col items-start w-56 min-w-max mr-4">
            <img className="h-48" src="./TMA-2-Modular-Headphone.png" alt="" />
            <h2 className="text-lg text-left font-normal mb-auto">TMA-2 HD Wireless</h2>
            <h3 className="text-lg text-left font-bold mb-auto">USD 350</h3>
          </div>
          <div className="card flex flex-col items-start w-56 min-w-max mr-4">
            <img className="h-48" src="./CO2-Cable.png" alt="" />
            <h2 className="text-lg text-left font-normal mb-auto">TMA-2 HD Wireless</h2>
            <h3 className="text-lg text-left font-bold mb-auto">USD 350</h3>
          </div>
        </div>
      </div>
      <div className="footer">
        <img className="h-6" src="./logo.svg" alt="Linker" />
        <h4 className="text-white pb-5">by KepplerTeam</h4>
        <h4 className="text-sm font-light text-primary-400 pb-2">© Linker 2021. All Rights Reserved</h4>
      </div>
    </div>
  );
}
