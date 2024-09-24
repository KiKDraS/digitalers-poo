namespace Clase33;

class Program
{
    static void Main(string[] args)
    {

        /*
            CÓDIGO DEL DIAGRAMA UML
        */


        /*
            Cuatro pilares de POO
                => Abstracción - Permite la creación de los Diagramas UML para conocer que Clases (idea de) vamos a necesitar
                => Herencia - Permite no repetir código. Muy ligado al pilar de Abstracción
                => Encapsulamiento - Encerrar dentro de la Clase los métodos y atributos para que sea la misma la Clase quien decida cómo compartir esa información. Se busca evitar modificar valores que rompan el programa sin darnos cuenta
                    -> Modificadores de visibilidad
                        -> public - Cualquiera puede modificar/utilizar el método/atributo
                        -> private - Sólo la Clase puede modificar/utilizar el método/atributo
                        -> protected - Sólo la Clase y sus Clases herederas pueden modificar/utilizar el método/atributo
                => Polimorfismo - Reemplazar la funcionalidad según sea necesario
                    -> Sobrecarga de métodos
                        -> Escribir el mismo método más de una vez, pasándole parámetros distintos
                    -> Sobrecarga de herencia
                        -> En la clase heredera, volver a escribir el método para modificar la funcionalidad

            Clase Abstracta
                -> Idea que se comparte en todo nuestro programa
                -> Genera un Árbol de Clases
                -> Nunca debe ser instanciada (nunca debe crearse un Objeto de esta Clase)            
        */

        Enano enano = new Enano("Pepe", 120.5);
        enano.Moverse();
        enano.Moverse(5);

        Paladin paladin = new Paladin("Pepe", 123);
        paladin.Saltar();
        paladin.AtaqueHacha();

        Guitarra guitarra = new Guitarra();
        Bardo bardo = new Bardo("Pepa", guitarra);
        bardo.Moverse();
        bardo.Moverse(10);
    }
}

abstract class Personaje
{
    private string name;
    private int vida;

    //Constructor - Función que se ejecuta cuando se va a crear un Objeto. Sólo se escribe si es necesario almacenar un valor al momento de la construcción
    public Personaje(string name){
        this.name = name;
        this.vida = 100;
    }

    //Sobrecarga de constructores -> Crear tantos constructores como posibilidades de creación inicial existan
    public Personaje(string name, int vida){
        this.name = name;
        this.vida = vida;
    }

    //Polimorfismo por sobrecarga de método
    public void Moverse(){
        Console.WriteLine("El personaje se mueve 2 espacios");
    }

    public void Moverse(int espacios){
        Console.WriteLine($"El personaje se mueve {espacios} espacios");
    }

    //Método abstracto - Dentro de una Clase Abstracta, declaro un método para que todas las Clases herederas estén forzadas a implementar. 
    // Cuando declaramos el método abstracto, no escribimos ningún código dentro de la función.
    public abstract void Saltar();
}

class Bardo : Personaje, Sanador
{
    Instrumento instrumento;
    public Bardo(string name, Instrumento instrumento) : base(name){
        this.instrumento = instrumento;
    }

    //Implementar método abstracto Saltar
    public override void Saltar() {
        Console.WriteLine("El bardo salta");
    }

    public void Sanar(){
        Console.WriteLine("El bardo sana");
    }
}

class Enano : Personaje, Luchador {
    private double altura;
    private Armadura armadura;

   public Enano(string name, double altura) : base(name) {
    this.altura = altura;
   }

   public void SetArmadura(Armadura armadura) {
    this.armadura = armadura;
   } 

  //Implementar método abstracto Saltar
  public override void Saltar() {
    Console.WriteLine("El enano salta");
  }

    public void Atacar(){
        Console.WriteLine("El enano ataca");
    }
}

// Futuro programador/a ni se te ocurra tratar de generar una herencia de Paladin porque no tiene ningún sentido
sealed class Paladin : Enano {
    Hacha hacha = new Hacha();

    public Paladin(string name, double altura) : base(name, altura) {
    }

    public void AtaqueHacha(){
        Console.WriteLine($"El paladin ataca con la hacha. Hace {hacha.Atacar()} puntos de daño");
    }
}

sealed class Forjador : Enano {
    public Forjador(string name, double altura) : base(name, altura) {
    }
}

// Clase que no se puede heredar
// class Otro : Paladin {

// }

class Orco : Personaje, Luchador
{
    public Orco(string name) : base(name){}

    public override void Saltar()
    {
       Console.WriteLine("El orco saltar");
    }

    public void Atacar()
    {
       Console.WriteLine("El orco ataca");
    }
}

abstract class Instrumento {
    private int vida = 20;

    public void Tocar(){
        Console.WriteLine("El instrumento suena");
    }
}

class Guitarra : Instrumento 
{
    
}

class Flauta : Instrumento
{

}

class Armadura
{
    
}

class Hacha
{
    public int Atacar(){
        return Golpes.Hacha;
    }
}

interface Luchador
{
    void Atacar();
}

interface Sanador
{
    void Sanar();
}

class Golpes
{
    public static readonly int Hacha = 10;
}