namespace Clase32;

class Program
{
    static void Main(string[] args)
    {
       /*
            C# -> Lenguaje fuertemente tipado con tipado estático
       */

    //    string datoString = "Dato de tipo string";
    //    int datoEntero = 10;
    //    double datoDecimal = 10.5;
    //    List<string> Nombres = new(){};
    //    Nombres.Add("Pepe");
    //    Nombres.Add("Pepa");

       // Imprimir los valores en la consola
    //    Console.WriteLine($"String: {datoString}"); // `String: ${datoString}`
    //    Console.WriteLine($"Entero: {datoEntero}");
    //    Console.WriteLine($"Decimal: {datoDecimal}");
    //    Console.WriteLine("Nombres:");
    //    foreach (var nombre in Nombres)
    //    {
    //        Console.WriteLine(nombre);
    //    }


       /*
          Paradigma de Programación Orientada a Objetos
            -> Diagramas UML
                -> "Mapa de Clases" que muestra como las distintas Clases interactúan entre sí
            -> 4 Pilares
                -> Abstracción - Se utiliza para pensar las Clases
                -> Herencia - Se utiliza para no repetir código
                -> Encapsulamiento - Una clase no debe permitir modificaciones por fuera de la misma
                    -> Modificadores de visibilidad
                        -> public - Todas las clases pueden usar/modificar el valor
                        -> private - Sólo la clase que lo contiene puede usar/modificar el valor
                        -> protected - Sólo la clase y las clases herederas pueden usar/modificar el valor
                    -> Regla general de encapsulamiento: Las propiedades tienen que ser private/protected y los métodos public    
                    -> Getters - Métodos que permiten que otras Clases lean el valor almacenado en la propiedad private/protected
                    -> Setters - Métodos que permiten que otras Clases soliciten la modificación  del valor almacenado en la propiedad private/protected
                -> Polimorfismo
            -> Clase - Modelo sobre el que se crean los Objetos 
                -> Son tipos de dato
            -> Objeto - Instancia de una Clase ("copiar" las propiedades y métodos de la clase)
       */

        // EmpleadoBancario empleado = new EmpleadoBancario("Pepe", 123456789, 123456);
        // empleado.Fichar();


        // EmpleadoBancario empleado1 = new EmpleadoBancario("Pepa", 987654321, 987654);
        // empleado1.Fichar();

        // Cajero cajero = new Cajero("Juan", 456123789, 65428);
        // cajero.Fichar();
        // cajero.Cobrar(123456);


        /*
            Sistema de cobranzas de una institución educativa privada
        */
        Administrativo administrativo = new Administrativo(123456, "Juan");

        Pago pago = new Pago("19/09/2024", 123456.0);
        Alumno alumno = new Alumno("Pepe", pago);
        Alumno alumnoSinPago = new Alumno("Pepa");

        administrativo.InscribirAlumno(alumno);    
        administrativo.InscribirAlumno(alumnoSinPago);    
        administrativo.MostrarAlumnosInscriptos();
    }
}

class EmpleadoBancario
{
    // Propiedades
    private string Nombre;
    private int Dni;
    private int NroLegajo;

    // Constructores
    public EmpleadoBancario(string nombre, int dni, int nroLegajo) {
        Nombre = nombre;
        Dni = dni;
        NroLegajo = nroLegajo;
     }

    /*
        Getters y Setters
    */
    public string GetNombre() {
        return Nombre;
    }

    public void SetNombre(string nombre) {
        Nombre = nombre;
    }

    public int GetDni() {
        return Dni;
    }

    public int GetNroLegajo() {
        return NroLegajo;
    }

    //public string Dni { get; set; }

    // Métodos
    public void Fichar(){
        Console.WriteLine($"Fichado como: {Nombre}");
    }
}

class Cajero : EmpleadoBancario
{
    // Constructor
    public Cajero(string nombre, int dni, int nroLegajo) : base(nombre, dni, nroLegajo) {

    }
    public void Cobrar(double pesos) {
        Console.WriteLine($"Cobrando ${pesos}...");
    }
}

class Avion
{
    public void Volar(){
        Console.WriteLine("Volando...");
    }
}

class AvionComercial : Avion {
    private int tanque = 10;
}

class AvionPasajero : Avion {
    private int tanque = 20;
}


/*
    Sistema de cobranzas de una institución educativa privada
*/
class Administrativo {
    private int Legajo;
    private string Nombre;
    private List<Alumno> Alumnos = new List<Alumno>();    

    public Administrativo(int legajo, string nombre) {
        Legajo = legajo;
        Nombre = nombre;
    }

    public void InscribirAlumno(Alumno alumno) {
        Alumnos.Add(alumno);
    }

    public void MostrarAlumnosInscriptos() {
        foreach (Alumno alumno in Alumnos) {
            Console.WriteLine($"Alumno: {alumno.GetNombre()}");
        }
    }
}

class Alumno {
    private string Nombre;
    private int Dni;
    private List<Pago> Pagos = new List<Pago>();

    // Sobrecarga de Constructores
    public Alumno(string nombre) {
        Nombre = nombre;
    }

    // Estructura del Constructor (string, int)
    public Alumno(string nombre, int dni) {
        Nombre = nombre;
        Dni = dni;
    }

    // Estructura del Constructor (string, int) - Error en sobrecarga
    // public Alumno(string apellido, int dni) {
    //     Nombre = apellido;
    //     Dni = dni;
    // }

    public Alumno(string nombre, Pago pago) {
        Nombre = nombre;
        Pagos.Add(pago);
    }

    public Alumno(string nombre, int dni, Pago pago) {
        Nombre = nombre;
        Dni = dni;
        Pagos.Add(pago);
    }

    public List<Pago> GetPagos() {
        return Pagos;
    }

    public string GetNombre() {
        return Nombre;
    }
    
    public void PagarCuota(Pago pago) {
        Pagos.Add(pago);
    }
}

class Pago {
    private string Fecha;
    private double Monto;

    public Pago(string fecha, double monto) {
        Fecha = fecha;
        Monto = monto;
    }
}