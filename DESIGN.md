# DESIGN.md — Sistema Visual Impeccable & Anti-Slop Specification

## 🛡️ Anti-Slop Manifesto (pbakaus/impeccable)
1. **Tipografia Distinta:** Proibido o uso exclusivo de Inter padrão de template AI. Adotada a combinação arquitetural `JetBrains Mono` (código, métricas, telemetria) e `Space Grotesk` (headings e display).
2. **Sem Gradientes Genéricos:** Zero gradientes roxo-para-azul ("AI slop purple-blue"). A paleta é inspirada em estúdios de tinta digital volumétrica e monitores de controle orbital: ardósia profunda (`#080c14`), tinta carbono (`#0f172a`), fósforo âmbar quente (`#f59e0b`) e ciano de telemetria espacial (`#06b6d4`).
3. **Sem Cards Aninhados:** Nada de cartões flutuantes dentro de outros cartões. O layout utiliza estruturas lineares arquiteturais, planos de contraste direto e separações por borders nítidos de 1px (`rgba(255,255,255,0.08)`).
4. **Sem Ícones Decorativos Desnecessários:** Nenhum quadradinho arredondado flutuando com ícone aleatório acima de cada título sem função.
5. **Sem Halos / Sombras Zero-Offset Falsas:** Sem borrões circulares estáticos. Sombras têm offsets realistas e a iluminação volumétrica vem do próprio canvas Three.js / WebGL2.
6. **Contraste Acessível e Texto com Matiz:** Textos secundários nunca são cinza opaco plano sem vida; herdam matizes sutis de ardósia ou ciano. Contraste mínimo de 4.5:1 rigorosamente respeitado.
7. **Chrome do Navegador Personalizado:** Scrollbar ultrafina com acabamento técnico, seleção de texto personalizada (`::selection` com fundo âmbar/ciano e texto contrastante), e anéis de foco precisos de 2px.

## 🎨 Paleta & Tokens
- **Background Root:** `#070a0f` (Ink Black)
- **Surface Level 1:** `#0b1019` (Dense Slate)
- **Surface Level 2:** `#111827` (Card / Section Slab)
- **Border Subtle:** `rgba(255, 255, 255, 0.08)`
- **Border Highlight:** `rgba(245, 158, 11, 0.35)` (Amber Focus)
- **Text Primary:** `#f8fafc` (Slate 50)
- **Text Muted:** `#94a3b8` (Slate 400 - tinted)
- **Accent Primary:** `#f59e0b` (Amber Phosphor)
- **Accent Secondary:** `#06b6d4` (Telemetry Cyan)
- **Accent Success:** `#10b981` (Emerald Systems Operational)

## 🧊 Computação Gráfica: Gaussian Splats & Ink Studio Pipeline
- **Pixel-Art Gaussian Splats (cobanov/pixelart-gaussiansplat):**
  - Renderização de surfels em Three.js / WebGL2: cada splat é modelado como um disco orientado com normais de superfície e rotação volumétrica.
  - Quantização de paleta em tempo real por votação de material + Ordered Bayer Dithering 4x4 matrix.
  - Silhuetas nítidas com contornos baseados na profundidade e sombreado de cor mais escuro.
  - Modos comutáveis pelo usuário no HUD interativo:
    - `Surfel Splats` (volumétrico denso)
    - `Pixel-Art Dither` (quantização retro 8-bit com dithering Bayer)
    - `Wireframe Matrix` (geometria pura)
- **GSAP:**
  - Animação cinematográfica de entrada com stagger e controle de telemetria.
