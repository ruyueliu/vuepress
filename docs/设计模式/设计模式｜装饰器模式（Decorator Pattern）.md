---
title: 设计模式(9)｜装饰器模式（Decorator Pattern）
date: 2024-04-10
---
装饰器模式（Decorator Pattern）是一种结构型设计模式，它允许在不改变原始对象的基础上，动态地给对象添加新的功能或责任。这种模式是通过创建一个包装对象，也就是装饰器，来包裹真实的对象，然后在装饰器中添加新的行为或功能。这样，就可以在运行时动态地修改对象的行为。
# 结构
装饰器模式通常涉及以下几个角色：

1.  **Component（组件）**：定义一个对象接口，可以给这些对象动态地添加职责。在装饰器模式中，通常是一个抽象类或接口，它定义了被装饰者和装饰者的公共接口。
2.  **ConcreteComponent（具体组件）**：实现了Component接口的具体对象，也就是被装饰的对象。
3.  **Decorator（装饰器）**：继承自Component，同时持有一个指向Component的引用，这样可以通过组合的方式来对被装饰者进行包装。
4.  **ConcreteDecorator（具体装饰器）**：实现了Decorator接口的具体装饰器对象，它向被装饰的对象添加新的功能或行为。
# 优缺点
装饰器模式有许多优点和一些缺点：
### 优点

1.  **灵活性**：装饰器模式允许你在不修改现有代码的情况下，动态地为对象添加新的功能。你可以根据需要组合不同的装饰器，以实现所需的功能组合。
2.  **可扩展性**：由于装饰器模式遵循开放封闭原则（对扩展开放，对修改封闭），因此你可以在不改变原始对象或其他装饰器的情况下，轻松地添加新的装饰器来扩展功能。
3.  **单一责任原则**：装饰器模式使得每个类只负责单一功能，从而符合单一责任原则。每个具体装饰器类只关注于添加一种特定的行为或责任。
4.  **避免类爆炸**：通过组合多个小型装饰器，而不是创建大量的子类，装饰器模式可以避免类的爆炸性增长。
### 缺点

1.  **复杂性**：如果过度使用装饰器模式，可能会导致代码变得复杂和难以理解。特别是当存在大量的装饰器和不同的组合方式时，可能会使代码变得混乱。
2.  **运行时开销**：由于装饰器模式是动态添加功能的，因此可能会在运行时引入一些额外的开销。这可能会影响性能，尤其是在装饰器链较长时。
3.  **难以移除特定功能**：一旦添加了装饰器，要移除特定功能可能会比较困难。特别是当存在多个装饰器时，需要确保移除特定功能不会影响到其他装饰器所添加的功能。

总的来说，装饰器模式是一种强大的设计模式，可以提供灵活性和可扩展性，但在使用时需要权衡好利弊，避免过度复杂化和性能损失。
# 适用场景
装饰器模式适用于以下情况：

1.  **需要动态地给对象添加新的功能**：当你需要在不修改现有对象的前提下，动态地为对象添加额外的功能时，装饰器模式非常适用。它允许你通过组合不同的装饰器来实现不同的功能组合。
2.  **需要避免创建大量子类**：当存在大量的类似但略有不同的对象时，通过创建大量的子类来实现不同的功能组合会导致类爆炸。装饰器模式可以通过组合少量的装饰器来实现多样的功能，从而避免类的爆炸性增长。
3.  **需要遵循开放封闭原则**：如果你希望在不修改现有代码的情况下添加新的功能，同时又不想创建大量的子类来实现不同的功能组合，装饰器模式是一个很好的选择。它允许你在不改变现有代码的情况下扩展功能。
4.  **需要遵循单一责任原则**：装饰器模式使得每个类只负责单一功能，每个具体装饰器类只关注于添加一种特定的行为或责任。这有助于保持代码的清晰度和可维护性。
5.  **需要在运行时动态地添加或移除功能**：装饰器模式允许你在运行时动态地添加或移除装饰器，从而实现不同的功能组合。这种灵活性非常有用，特别是在需要动态地调整对象的行为时。

总的来说，装饰器模式适用于需要**动态地添加功能**、**避免类的爆炸性增长**、**遵循开放封闭原则**和**单一责任原则**以及**在运行时动态地调整对象行为**的情况。
# 示例
下面是一个简单的示例，说明如何使用装饰器模式：
```java
// Component
interface Coffee {
    double cost();
}

// ConcreteComponent
class SimpleCoffee implements Coffee {
    @Override
    public double cost() {
        return 5;
    }
}

// Decorator
abstract class CoffeeDecorator implements Coffee {
    protected Coffee decoratedCoffee;

    public CoffeeDecorator(Coffee coffee) {
        this.decoratedCoffee = coffee;
    }

    public double cost() {
        return decoratedCoffee.cost();
    }
}

// ConcreteDecorator
class WithMilk extends CoffeeDecorator {
    public WithMilk(Coffee coffee) {
        super(coffee);
    }

    @Override
    public double cost() {
        return super.cost() + 2;
    }
}

// ConcreteDecorator
class WithSugar extends CoffeeDecorator {
    public WithSugar(Coffee coffee) {
        super(coffee);
    }

    @Override
    public double cost() {
        return super.cost() + 1;
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        Coffee simpleCoffee = new SimpleCoffee();
        System.out.println("Cost of simple coffee: " + simpleCoffee.cost());

        Coffee coffeeWithMilk = new WithMilk(simpleCoffee);
        System.out.println("Cost of coffee with milk: " + coffeeWithMilk.cost());

        Coffee coffeeWithMilkAndSugar = new WithSugar(coffeeWithMilk);
        System.out.println("Cost of coffee with milk and sugar: " + coffeeWithMilkAndSugar.cost());
    }
}
```

这个示例中，`Coffee`是组件接口，`SimpleCoffee`是具体组件类。`CoffeeDecorator`是装饰器抽象类，`WithMilk`和`WithSugar`是具体装饰器类。通过组合不同的装饰器，我们可以为咖啡对象添加不同的配料，而不需要修改原始的`SimpleCoffee`类。
