import { useState } from "react";
import { FaFacebook, FaInstagram, FaWhatsapp, FaFacebookMessenger } from "react-icons/fa";

// Datos de productos
const products = [
  { id: 1, name: "Flor Decorativa", price: 80, img: "/img/image2.png" },
  { id: 2, name: "Pingüinito Amigurumi", price: 80, img: "/img/image3.png" },
  { id: 3, name: "Monedero Corazón", price: 95, img: "/img/image4.png" },
  { id: 4, name: "Mini Sombrero", price: 60, img: "/img/image5.png" },
  { id: 5, name: "Osito Rojo", price: 105, img: "/img/image6.png" },
  { id: 6, name: "Bolsa Tejida", price: 70, img: "/img/image8.png" },
  { id: 7, name: "Osito Verde", price: 105, img: "/img/image7.png" },
];

export default function App() {
  const [formData, setFormData] = useState({ name: "", product: "", message: "" });
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [transition, setTransition] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappMsg = `Hola, soy ${formData.name}. Me interesa el producto: ${formData.product}. Detalles: ${formData.message}`;
    window.open(`https://wa.me/525530761609?text=${encodeURIComponent(whatsappMsg)}`, "_blank");
  };

  const itemsPerPage = 6;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  const changePage = (direction) => {
    if (direction === "next" && currentPage < totalPages - 1) {
      setTransition(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setTransition(false);
      }, 300);
    }
    if (direction === "prev" && currentPage > 0) {
      setTransition(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setTransition(false);
      }, 300);
    }
  };

  return (
    <div className="bg-amber-50 text-gray-800 min-h-screen">
      {/* Navbar */}
      <nav className="bg-white text-orange-800 p-4 flex justify-between items-center shadow-lg fixed top-0 w-full z-50">
        <div className="flex items-center gap-3">
          <img src="/img/logo.png" alt="Tejer con Pandy" className="h-12" />
          <h1 className="text-2xl font-bold">Tejer con Pandy</h1>
        </div>
        <div className="space-x-4">
          <a href="#productos" className="hover:underline font-semibold">Productos</a>
          <a href="#pedido" className="hover:underline font-semibold">Hacer pedido</a>
        </div>
      </nav>

      {/* Sección destacada */}
      <section className="pt-28 pb-16 px-6 bg-gradient-to-r from-orange-100 to-amber-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
          <img src="/img/logo.png" alt="Tejer con Pandy" className="h-40 md:h-56" />
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-orange-900 mb-4">Bienvenido a Tejer con Pandy</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto md:mx-0 text-justify">
              Creaciones únicas hechas a mano con amor. Encuentra el regalo perfecto o el accesorio ideal
              para ti, hechos con crochet y mucha dedicación.
            </p>
            <a
              href="#productos"
              className="mt-6 inline-block bg-orange-700 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-orange-800 transition"
            >
              Ver Productos
            </a>
            <div className="flex justify-center md:justify-start gap-4 mt-6 text-3xl text-orange-800">
              <a href="https://www.facebook.com/profile.php?id=61578723214906" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
              <a href="https://www.instagram.com/tejerconpandy/?igsh=MWs5dTBuZ2ZsbDIwNw%3D%3D" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://wa.me/5530761609?text=Hola%2C%20quiero%20información%20sobre%20tus%20tejidos" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
            </div>
          </div>
        </div>
      </section>

      {/* Productos con paginación */}
      <section id="productos" className="p-6">
        <h2 className="text-3xl font-bold text-center text-orange-900 mb-6">
          Nuestros Productos
        </h2>
        <p className="text-center text-sm text-gray-600 mb-4">
          *Los precios pueden variar de acuerdo al tamaño del objeto.
        </p>
        <div className="relative">
          <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-justify transition-transform duration-300 ${transition ? "opacity-50" : "opacity-100"}`}>
            {paginatedProducts.map((p) => (
              <div key={p.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-48 object-cover cursor-pointer"
                  onClick={() => setSelectedImage(p.img)}
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-orange-900">{p.name}</h3>
                  <p className="text-orange-700 font-bold">${p.price} MXN</p>
                </div>
              </div>
            ))}
          </div>

          {/* Botones de navegación centrados */}
          <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2 px-4">
            <button
              onClick={() => changePage("prev")}
              disabled={currentPage === 0}
              className="bg-orange-700 text-white p-3 rounded-full disabled:opacity-50 shadow-lg"
            >
              ◀
            </button>
            <button
              onClick={() => changePage("next")}
              disabled={currentPage === totalPages - 1}
              className="bg-orange-700 text-white p-3 rounded-full disabled:opacity-50 shadow-lg"
            >
              ▶
            </button>
          </div>
        </div>
      </section>

      {/* Modal de imagen */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img src={selectedImage} alt="Producto ampliado" className="max-w-3xl max-h-full rounded-lg shadow-lg" />
        </div>
      )}

      {/* Formulario */}
      <section id="pedido" className="w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md my-10">
        <h2 className="text-2xl font-semibold text-orange-900 mb-4 text-center">Haz tu pedido</h2>
        <p className="text-center text-sm text-gray-600 mb-4">
          *Los precios pueden variar de acuerdo al tamaño del objeto.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 text-justify">
          <input type="text" name="name" placeholder="Nombre" value={formData.name} onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 text-gray-800" required />
          <select name="product" value={formData.product} onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 text-gray-800" required>
            <option value="">Selecciona un producto</option>
            {products.map((p) => (
              <option key={p.id} value={p.name}>{p.name}</option>
            ))}
            <option value="Otro">Otro (especificar en el mensaje)</option>
          </select>
          <textarea name="message" placeholder="Especifica tu pedido o consulta" value={formData.message} onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 text-gray-800" rows="4" required />
          <button type="submit" className="w-full bg-orange-700 text-white p-3 rounded-lg hover:bg-orange-800 transition">
            Enviar por WhatsApp
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-orange-800 text-white text-center p-6">
        <p className="mb-2">© 2025 Tejer con Pandy - Todos los derechos reservados</p>
        <div className="flex justify-center gap-6 text-2xl">
          <a href="https://www.facebook.com/profile.php?id=61578723214906" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
          <a href="https://www.instagram.com/tejerconpandy/?igsh=MWs5dTBuZ2ZsbDIwNw%3D%3D" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://wa.me/5530761609?text=Hola%2C%20quiero%20información%20sobre%20tus%20tejidos" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
        </div>
      </footer>

      {/* Botón flotante de WhatsApp */}
      <a
        href="https://wa.me/5530761609?text=Hola%2C%20quiero%20información%20sobre%20tus%20tejidos"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition z-50"
      >
        <FaWhatsapp className="text-3xl" />
      </a>

      {/* Botón flotante de Messenger */}
      <a
        href="https://m.me/763090706878473"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-28 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition z-50"
      >
        <FaFacebookMessenger className="text-3xl" />
      </a>
    </div>
  );
}