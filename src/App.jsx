import { useState, useEffect, useRef } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaFacebookMessenger,
  FaStar,
  FaHeart,
  FaShippingFast,
  FaPaintBrush,
} from "react-icons/fa";

/* ─── Catálogo de productos ─────────────────────────────────────────── */
const products = [
  // Clásicos
  { id: 1,  name: "Flor Decorativa",         price: 80,  img: "/img/image2.png",                      tag: null },
  { id: 2,  name: "Pingüinito Amigurumi",     price: 80,  img: "/img/image3.png",                      tag: null },
  { id: 3,  name: "Monedero Corazón",         price: 95,  img: "/img/image4.png",                      tag: null },
  { id: 4,  name: "Mini Sombrero",            price: 60,  img: "/img/image5.png",                      tag: null },
  { id: 5,  name: "Osito Rojo",               price: 105, img: "/img/image6.png",                      tag: null },
  { id: 6,  name: "Bolsa Tejida",             price: 70,  img: "/img/image8.png",                      tag: null },
  { id: 7,  name: "Osito Verde",              price: 105, img: "/img/image7.png",                      tag: null },
  // Nuevos
  { id: 8,  name: "Snoopy Amigurumi",         price: 130, img: "/img/nuevas/snoopy.jpeg",              tag: "Nuevo" },
  { id: 9,  name: "Gatito Esponjoso",         price: 120, img: "/img/nuevas/gatito.jpeg",              tag: "Nuevo" },
  { id: 10, name: "Cobayas Amigurumi",        price: 110, img: "/img/nuevas/cobayas.jpeg",             tag: "Nuevo" },
  { id: 11, name: "Virgen de Guadalupe",      price: 150, img: "/img/nuevas/virgen-guadalupe.jpeg",    tag: "Nuevo" },
  { id: 12, name: "Ranita con Sombrero",      price: 120, img: "/img/nuevas/ranita.jpeg",              tag: "Nuevo" },
  { id: 13, name: "Koala Esponjoso",          price: 130, img: "/img/nuevas/koala.jpeg",               tag: "Nuevo" },
  { id: 14, name: "Tortugas Frutales",        price: 115, img: "/img/nuevas/tortugas-frutas.jpeg",     tag: "Nuevo" },
];

/* ─── Características del negocio ───────────────────────────────────── */
const features = [
  { icon: FaHeart,        title: "Hecho con amor",      desc: "Cada pieza es elaborada a mano con dedicación y cariño." },
  { icon: FaPaintBrush,   title: "Diseños únicos",      desc: "Personalizamos tu pedido a tu gusto y color favorito." },
  { icon: FaShippingFast, title: "Envíos a todo México", desc: "Llevamos tu tejido a cualquier parte del país." },
  { icon: FaStar,         title: "Calidad garantizada", desc: "Materiales de calidad para que duren toda la vida." },
];

/* ─── Testimoniales ─────────────────────────────────────────────────── */
const testimonials = [
  { name: "Mariana G.",   text: "¡Me encantó mi osito! Llegó perfecto y muy bien empacado. Definitivamente volvería a comprar." },
  { name: "Carlos R.",    text: "Le regalé la Virgen de Guadalupe a mi mamá y lloró de emoción. Trabajo increíble." },
  { name: "Sofía M.",     text: "Los cobayas son adorables, idénticos a los de la foto. Calidad de 10." },
  { name: "Daniela V.",   text: "Pedí un diseño personalizado y quedó mejor de lo que esperaba. ¡100% recomendado!" },
];

const ITEMS_PER_PAGE = 6;
const WA_NUMBER = "525530761609";
const WA_BASE = `https://wa.me/${WA_NUMBER}`;

/* ─── Componente principal ──────────────────────────────────────────── */
export default function App() {
  const [formData, setFormData]         = useState({ name: "", product: "", message: "" });
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage]   = useState(0);
  const [transition, setTransition]     = useState(false);
  const [navScrolled, setNavScrolled]   = useState(false);
  const [filter, setFilter]             = useState("todos");
  const heroRef = useRef(null);

  /* nav con sombra al hacer scroll */
  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* reiniciar paginación al cambiar filtro */
  useEffect(() => { setCurrentPage(0); }, [filter]);

  const filteredProducts =
    filter === "nuevos"
      ? products.filter((p) => p.tag === "Nuevo")
      : products;

  const totalPages      = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    currentPage * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  const changePage = (dir) => {
    const next = dir === "next" ? currentPage + 1 : currentPage - 1;
    if (next < 0 || next >= totalPages) return;
    setTransition(true);
    setTimeout(() => { setCurrentPage(next); setTransition(false); }, 280);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `Hola, soy ${formData.name}. Me interesa el producto: ${formData.product}. Detalles: ${formData.message}`;
    window.open(`${WA_BASE}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  /* ── Marcador de página ── */
  const Dots = () => (
    <div className="flex justify-center gap-2 mt-4">
      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          onClick={() => { setTransition(true); setTimeout(() => { setCurrentPage(i); setTransition(false); }, 280); }}
          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === currentPage ? "bg-orange-700 scale-125" : "bg-orange-200"}`}
        />
      ))}
    </div>
  );

  return (
    <div className="bg-amber-50 text-gray-800 min-h-screen font-sans">

      {/* ── Navbar ──────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${navScrolled ? "bg-white shadow-lg py-2" : "bg-white/90 backdrop-blur py-3"}`}>
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/img/logo.png" alt="Tejer con Pandy" className="h-11" />
            <span className="text-xl font-bold text-orange-800 tracking-tight">Tejer con Pandy</span>
          </div>
          <div className="flex items-center gap-5 text-sm font-semibold text-orange-800">
            <a href="#productos" className="hover:text-orange-600 transition">Productos</a>
            <a href="#nosotros"  className="hover:text-orange-600 transition hidden sm:inline">Nosotros</a>
            <a
              href="#pedido"
              className="bg-orange-700 text-white px-4 py-2 rounded-full hover:bg-orange-800 transition pulse-cta"
            >
              Pedir ahora
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative pt-28 pb-20 px-6 overflow-hidden"
        style={{ background: "linear-gradient(135deg,#fff7ed 0%,#fef3c7 50%,#ffe4e6 100%)" }}
      >
        {/* círculos decorativos */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-orange-100 rounded-full opacity-50 blur-3xl" />
        <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-pink-100 rounded-full opacity-60 blur-3xl" />

        <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          {/* logo flotante */}
          <div className="flex-shrink-0 float">
            <img src="/img/logo.png" alt="Tejer con Pandy" className="h-44 md:h-60 drop-shadow-xl" />
          </div>

          {/* texto */}
          <div className="text-center md:text-left fade-in-up">
            <span className="inline-block bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
              Tejidos artesanales
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-orange-900 leading-tight mb-4">
              Creaciones únicas<br />
              <span className="text-orange-600">hechas con amor</span>
            </h1>
            <p className="text-gray-600 max-w-xl mb-6 text-justify leading-relaxed">
              Amigurumis, accesorios y regalos de crochet elaborados a mano con dedicación.
              Encuentra la pieza perfecta o encarga tu diseño personalizado.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <a
                href="#productos"
                className="bg-orange-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-800 transition shadow-md"
              >
                Ver productos
              </a>
              <a
                href={`${WA_BASE}?text=${encodeURIComponent("Hola, quiero información sobre sus tejidos")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition shadow-md"
              >
                <FaWhatsapp /> Escríbenos
              </a>
            </div>

            {/* redes */}
            <div className="flex gap-5 mt-6 text-2xl text-orange-700 justify-center md:justify-start">
              <a href="https://www.facebook.com/profile.php?id=61578723214906" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition"><FaFacebook /></a>
              <a href="https://www.instagram.com/tejerconpandy/?igsh=MWs5dTBuZ2ZsbDIwNw%3D%3D" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition"><FaInstagram /></a>
              <a href={`${WA_BASE}?text=${encodeURIComponent("Hola, quiero información sobre sus tejidos")}`} target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition"><FaWhatsapp /></a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Banda de características ─────────────────────────────────── */}
      <section id="nosotros" className="bg-orange-700 text-white py-10 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center gap-2">
              <div className="bg-white/20 p-3 rounded-full">
                <Icon className="text-2xl" />
              </div>
              <p className="font-bold text-sm">{title}</p>
              <p className="text-orange-100 text-xs leading-snug">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Productos ────────────────────────────────────────────────── */}
      <section id="productos" className="max-w-6xl mx-auto px-4 py-14">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-orange-900 mb-2">Nuestros Productos</h2>
          <p className="text-gray-500 text-sm mb-5">*Los precios pueden variar según el tamaño.</p>

          {/* filtros */}
          <div className="flex justify-center gap-3">
            {["todos", "nuevos"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                  filter === f
                    ? "bg-orange-700 text-white shadow"
                    : "bg-white text-orange-700 border border-orange-300 hover:bg-orange-50"
                }`}
              >
                {f === "todos" ? "Todos" : "Nuevos"}
              </button>
            ))}
          </div>
        </div>

        {/* grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-300 ${transition ? "opacity-0" : "opacity-100"}`}>
          {paginatedProducts.map((p) => (
            <div
              key={p.id}
              className="group bg-white rounded-2xl shadow hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div className="relative overflow-hidden h-52">
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  className="w-full h-full object-cover cursor-pointer group-hover:scale-105 transition-transform duration-500"
                  onClick={() => setSelectedImage(p.img)}
                />
                {p.tag && (
                  <span className="absolute top-3 left-3 bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                    {p.tag}
                  </span>
                )}
                <div
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-300 flex items-center justify-center cursor-pointer"
                  onClick={() => setSelectedImage(p.img)}
                >
                  <span className="opacity-0 group-hover:opacity-100 transition bg-white/90 text-orange-800 text-xs font-semibold px-3 py-1 rounded-full pointer-events-none">
                    Ver más
                  </span>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <h3 className="font-bold text-orange-900 text-lg">{p.name}</h3>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-orange-600 font-extrabold text-xl">${p.price} <span className="text-sm font-normal text-gray-400">MXN</span></span>
                  <a
                    href={`${WA_BASE}?text=${encodeURIComponent(`Hola, me interesa: ${p.name}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 bg-green-500 text-white text-xs font-semibold px-3 py-2 rounded-full hover:bg-green-600 transition"
                  >
                    <FaWhatsapp /> Pedir
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* paginación */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => changePage("prev")}
              disabled={currentPage === 0}
              className="bg-orange-700 text-white px-5 py-2 rounded-full disabled:opacity-40 hover:bg-orange-800 transition font-semibold"
            >
              ◀ Anterior
            </button>
            <Dots />
            <button
              onClick={() => changePage("next")}
              disabled={currentPage === totalPages - 1}
              className="bg-orange-700 text-white px-5 py-2 rounded-full disabled:opacity-40 hover:bg-orange-800 transition font-semibold"
            >
              Siguiente ▶
            </button>
          </div>
        )}
      </section>

      {/* ── Modal imagen ampliada ─────────────────────────────────────── */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Producto ampliado" className="w-full rounded-2xl shadow-2xl" />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-4 -right-4 bg-white text-orange-800 w-9 h-9 rounded-full font-bold text-lg shadow hover:bg-orange-100 transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* ── Testimoniales ────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-orange-50 to-amber-100 py-14 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center text-orange-900 mb-8">Lo que dicen nuestros clientes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {testimonials.map(({ name, text }) => (
              <div key={name} className="bg-white rounded-2xl shadow p-5 flex flex-col gap-3">
                <div className="flex gap-1 text-orange-400">
                  {Array(5).fill(0).map((_, i) => <FaStar key={i} className="text-xs" />)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed italic">"{text}"</p>
                <p className="font-bold text-orange-800 text-sm">— {name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Formulario de pedido ─────────────────────────────────────── */}
      <section id="pedido" className="py-14 px-6">
        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-extrabold text-orange-900 mb-1 text-center">Haz tu pedido</h2>
          <p className="text-center text-gray-500 text-sm mb-6">*Los precios pueden variar según el tamaño.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Tu nombre"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800"
            />
            <select
              name="product"
              value={formData.product}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800"
            >
              <option value="">Selecciona un producto</option>
              {products.map((p) => (
                <option key={p.id} value={p.name}>{p.name}</option>
              ))}
              <option value="Otro">Otro (especificar en el mensaje)</option>
            </select>
            <textarea
              name="message"
              placeholder="Especifica tu pedido: colores, tamaño, detalles especiales…"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800 resize-none"
            />
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-green-500 text-white p-3 rounded-xl font-bold text-lg hover:bg-green-600 transition shadow"
            >
              <FaWhatsapp className="text-xl" /> Enviar por WhatsApp
            </button>
          </form>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="bg-orange-900 text-white py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img src="/img/logo.png" alt="Logo" className="h-12" />
            <div>
              <p className="font-bold text-lg">Tejer con Pandy</p>
              <p className="text-orange-200 text-sm">Tejidos artesanales con amor</p>
            </div>
          </div>
          <div className="flex gap-6 text-2xl">
            <a href="https://www.facebook.com/profile.php?id=61578723214906" target="_blank" rel="noopener noreferrer" className="hover:text-orange-300 transition"><FaFacebook /></a>
            <a href="https://www.instagram.com/tejerconpandy/?igsh=MWs5dTBuZ2ZsbDIwNw%3D%3D" target="_blank" rel="noopener noreferrer" className="hover:text-orange-300 transition"><FaInstagram /></a>
            <a href={`${WA_BASE}?text=${encodeURIComponent("Hola, quiero información sobre sus tejidos")}`} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition"><FaWhatsapp /></a>
          </div>
        </div>
        <p className="text-center text-orange-300 text-xs mt-6">© 2025 Tejer con Pandy — Todos los derechos reservados</p>
      </footer>

      {/* ── Botones flotantes ─────────────────────────────────────────── */}
      <a
        href={`${WA_BASE}?text=${encodeURIComponent("Hola, quiero información sobre sus tejidos")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-xl hover:bg-green-600 transition z-50"
        title="WhatsApp"
      >
        <FaWhatsapp className="text-3xl" />
      </a>
      <a
        href="https://m.me/763090706878473"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-6 bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 transition z-50"
        title="Messenger"
      >
        <FaFacebookMessenger className="text-3xl" />
      </a>
    </div>
  );
}
