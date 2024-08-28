# Encriptador

Aplicación web para encriptar y desencriptar textos utilizando un esquema de sustitución de caracteres. Incluye funciones para copiar el texto encriptado al portapapeles.

## Funcionalidades

1. **Encriptar Texto**
    Las "llaves" de encriptación que utilizaremos son las siguientes:
        - `e` se convierte en `enter`
        - `i` se convierte en `imes`
        - `a` se convierte en `ai`
        - `o` se convierte en `ober`
        - `u` se convierte en `ufat`

2. **Desencriptar Texto**
    Reemplaza las secuencias encriptadas de vuelta a las letras originales:
        - `ai` se convierte en `a`
        - `enter` se convierte en `e`
        - `imes` se convierte en `i`
        - `ober` se convierte en `o`
        - `ufat` se convierte en `u`

**Requisitos**
    Requisitos:
        - Debe funcionar solo con letras minúsculas
        - No deben ser utilizados letras con acentos ni caracteres especiales
        - Debe ser posible convertir una palabra para la versión encriptada también devolver una palabra encriptada para su versión original.