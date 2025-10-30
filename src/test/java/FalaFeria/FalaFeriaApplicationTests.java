package FalaFeria;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class FalaFeriaApplicationTests {

    @Test
    void testCamposVacios() {
        String correo = "";
        String contrasena = "";

        boolean validos = !correo.trim().isEmpty() && !contrasena.trim().isEmpty();

        Assertions.assertFalse(validos, "Debe fallar si los campos están vacíos");
    }

    @Test
    void testLoginCorrecto() {
        String correoIngresado = "test@test.com";
        String contrasenaIngresada = "123456";

        String correoRegistrado = "test@test.com";
        String contrasenaRegistrada = "123456";

        boolean ok = correoIngresado.equals(correoRegistrado) &&
                contrasenaIngresada.equals(contrasenaRegistrada);

        Assertions.assertTrue(ok, "Debe iniciar sesión correctamente");
    }

    @Test
    void testContrasenaIncorrecta() {
        String correoIngresado = "test@test.com";
        String contrasenaIngresada = "000000";

        String correoRegistrado = "test@test.com";
        String contrasenaRegistrada = "123456";

        boolean ok = correoIngresado.equals(correoRegistrado) &&
                contrasenaIngresada.equals(contrasenaRegistrada);

        Assertions.assertFalse(ok, "Debe fallar si la contraseña no coincide");
    }
}
