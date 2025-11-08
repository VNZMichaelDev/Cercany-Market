# 🛒 Cercany Market - Instrucciones de Uso

## 🚀 Cómo Iniciar la Aplicación

1. **Abrir terminal en la carpeta del proyecto:**
   ```bash
   cd "c:\Users\ElixirStudio\Desktop\Cercany Market\cercany-market-app"
   ```

2. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

3. **Abrir en el navegador:**
   - La app estará disponible en: `http://localhost:5173`

## 📱 Flujo de Uso

### 1️⃣ Registro/Login
- Al abrir la app, verás la pantalla de autenticación
- **Para registrarte:**
  - Haz click en "Regístrate"
  - Completa: Nombre, Email, Teléfono, Contraseña
  - Haz click en "Registrarse"
- **Para iniciar sesión:**
  - Ingresa tu Email y Contraseña
  - Haz click en "Iniciar Sesión"

### 2️⃣ Página Principal (Home)
- Verás el logo "Cercany Market"
- Barra de búsqueda para filtrar productos
- 4 categorías clickeables:
  - 🍴 Food (verde)
  - 💻 Technology (azul)
  - 🌾 Groceries (naranja)
  - ⚙️ Spare Parts (mint)
- Productos populares con precios en dólares
- Tiendas cercanas con calificaciones

### 3️⃣ Agregar al Carrito
- Haz click en "Add to Cart" en cualquier producto
- Verás una confirmación
- El producto se guarda en localStorage

### 4️⃣ Ver Carrito
- Haz click en el ícono "Cart" en la navegación inferior
- Verás todos tus productos agregados
- Puedes:
  - Aumentar/disminuir cantidad con los botones +/-
  - Eliminar productos con el ícono de basura
  - Ver el total calculado automáticamente

### 5️⃣ Checkout
- En el carrito, haz click en "Checkout"
- Selecciona método de pago:
  - 📱 Pago Móvil
  - 💵 Efectivo
- Opcionalmente marca "Incluir delivery" (+$2.00)
- Revisa el resumen de compra
- Haz click en "Confirmar Pedido"
- El pedido se guarda en localStorage

### 6️⃣ Perfil
- Haz click en el ícono "Profile" en la navegación inferior
- Verás tu información personal
- Opciones disponibles:
  - 📦 Orders (ver tus pedidos)
  - 📍 Addresses (direcciones guardadas)
  - ⚙️ Settings (configuración)
  - 🚪 Logout (cerrar sesión)

## 🔧 Características Técnicas

### Almacenamiento Local
Todo se guarda en **localStorage**:
- Usuarios registrados
- Sesión actual
- Productos en el carrito
- Pedidos realizados
- Datos de negocios y productos demo

### Datos Demo Incluidos
La app viene con datos de ejemplo:
- **2 Negocios:**
  - Bodegón El Trujillano (Groceries)
  - Tech Store (Technology)
- **6 Productos:**
  - Cheeseburger - $5.00
  - Smartphone - $299.00
  - Pizza Pepperoni - $8.50
  - Laptop - $899.00
  - Arroz 1kg - $2.50
  - Auriculares Bluetooth - $45.00

### Navegación
- **Home:** Ver productos y categorías
- **Cart:** Gestionar carrito de compras
- **Profile:** Ver perfil y cerrar sesión

## 🐛 Solución de Problemas

### Los botones de navegación no funcionan
1. Asegúrate de estar registrado/logueado
2. Abre la consola del navegador (F12)
3. Verifica que no haya errores
4. Intenta refrescar la página (F5)

### El carrito está vacío
- Los productos se guardan en localStorage
- Si limpias el navegador, se borrarán
- Agrega productos nuevamente desde Home

### No puedo iniciar sesión
- Si es tu primera vez, usa "Regístrate"
- El sistema verifica que el email exista en localStorage
- Para demo, cualquier contraseña funciona si el usuario existe

## 💡 Consejos

1. **Prueba las categorías:** Haz click en Food, Technology, etc. para filtrar productos
2. **Usa la búsqueda:** Escribe el nombre de un producto para encontrarlo rápido
3. **Experimenta con el carrito:** Agrega varios productos y juega con las cantidades
4. **Prueba el checkout:** Completa una compra para ver el flujo completo
5. **Cierra sesión y vuelve a entrar:** Tu información se mantiene en localStorage

## 🎨 Diseño

- **Mobile-first:** Optimizado para pantallas de celular (max-width: 480px)
- **Colores:** Verde, azul, naranja, mint según categorías
- **Navegación fija:** Los botones Home/Cart/Profile siempre visibles
- **Diseño limpio:** Inspirado en apps modernas de e-commerce

---

¿Necesitas ayuda? Revisa la consola del navegador (F12) para ver logs de debugging.
