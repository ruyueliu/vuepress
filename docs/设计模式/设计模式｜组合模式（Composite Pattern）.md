---
title: 设计模式(13)｜组合模式（Composite Pattern）
date: 2024-04-09
---
@[toc]
# 什么是组合模式？
组合模式（Composite Pattern）是一种结构型设计模式，它允许你将对象组合成树形结构以表示部分-整体的层次结构。这种模式使得客户端能够以统一的方式处理单个对象和组合对象。
# 主要角色

-  **组件（Component）**：定义了组合中对象的通用接口，可以是抽象类或接口。该接口通常包含对子节点的管理操作，比如添加子节点、删除子节点等。
-  **叶子（Leaf）**：表示组合中的叶子节点对象，叶子节点没有子节点。
-  **组合（Composite）**：表示组合中的容器节点对象，组合节点可以包含其他组件，即子节点。组合节点通常实现了组件接口中的操作，并且可以递归地调用子节点的操作。
# 举例
## 组织关系树
公司组织关系可能分为部门与人，其中人属于部门，有的人有下属，有的人没有下属。如果我们统一将部门、人抽象为组织节点，就可以方便的统计某个部门下有多少人、财务数据等等，而不用关心当前节点是部门还是人。
## 操作系统的文件夹与文件
操作系统的文件夹与文件也是典型的树状结构，为了方便递归出文件夹内文件数量或者文件总大小，我们最好设计的时候就将文件夹与文件抽象为文件，这样每个节点都拥有相同的方法添加、删除、查找子元素，而不需要关心当前节点是文件夹或是文件。
# 代码示例：文件系统

考虑一个文件系统的例子，其中文件和文件夹是节点，文件夹可以包含其他文件夹或文件。这是组合模式的一个典型应用场景。

```java
import java.util.ArrayList;
import java.util.List;

// 组件接口
interface FileSystemComponent {
    String getName();
    int getSize();
}

// 文件类（叶子节点）
class File implements FileSystemComponent {
    private String name;
    private int size;

    public File(String name, int size) {
        this.name = name;
        this.size = size;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public int getSize() {
        return size;
    }
}

// 文件夹类（组合节点）
class Folder implements FileSystemComponent {
    private String name;
    private List<FileSystemComponent> children;

    public Folder(String name) {
        this.name = name;
        this.children = new ArrayList<>();
    }

    public void add(FileSystemComponent component) {
        children.add(component);
    }

    public void remove(FileSystemComponent component) {
        children.remove(component);
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public int getSize() {
        int totalSize = 0;
        for (FileSystemComponent component : children) {
            totalSize += component.getSize();
        }
        return totalSize;
    }
}

public class Main {
    public static void main(String[] args) {
        // 创建文件
        File file1 = new File("file1.txt", 10);
        File file2 = new File("file2.txt", 20);

        // 创建文件夹
        Folder folder1 = new Folder("Folder 1");
        folder1.add(file1);
        folder1.add(file2);

        File file3 = new File("file3.txt", 30);

        // 创建更深层次的文件夹
        Folder folder2 = new Folder("Folder 2");
        folder2.add(folder1);
        folder2.add(file3);

        // 计算文件夹大小
        System.out.println("Folder 1 size: " + folder1.getSize() + " KB");
        System.out.println("Folder 2 size: " + folder2.getSize() + " KB");
    }
}

```

在这个例子中，`FileSystemComponent` 是组件接口，`File` 是叶子节点，`Folder` 是组合节点。通过这种结构，我们可以方便地管理文件系统中的文件和文件夹，并且可以统一地处理它们。
# 优缺点
## 优点
组合模式适用于需要处理部分-整体层次结构的场景，例如文件系统、菜单导航等。它能够使得代码更加灵活、易于扩展，并且提高了代码的可维护性。

-  **统一接口**：客户端可以统一地对待单个对象和组合对象，简化了客户端代码。
-  **灵活性**：可以很容易地增加新的组件类型，而不需要修改现有的代码。
-  **递归处理**：适用于需要递归处理层次结构的场景，比如树形结构的数据。
## 缺点
尽管组合模式在许多场景下都是非常有用的，但它也有一些潜在的缺点：

1.  **复杂性增加**：组合模式引入了额外的类和接口，可能会增加代码的复杂性。特别是在处理较大的层次结构时，可能会导致类的数量增加，增加了系统的复杂度。
2.  **叶子节点限制**：在组合模式中，叶子节点和组合节点都必须实现相同的接口。这意味着叶子节点可能会被强制实现一些在其情况下无意义的方法，这可能会增加冗余或者使接口设计不够灵活。
3.  **一致性问题**：当组合模式中的组件遍布不同的层次结构时，可能会出现一致性问题。如果不小心操作了某个节点，可能会对整个层次结构产生意外的影响。
4.  **性能开销**：在一些情况下，递归地遍历组合模式的层次结构可能会导致性能问题，特别是当层次结构很大时。此外，每个组件都需要管理其子组件的列表，可能会导致内存开销增加。
5.  **不易理解**：组合模式的结构相对复杂，可能需要一定时间才能理解其工作原理。特别是对于初学者来说，理解递归调用和层次结构可能是一项挑战。

尽管组合模式具有这些缺点，但在正确的场景下，它仍然是一种非常强大的设计模式，能够有效地组织和管理对象的层次结构。在使用组合模式时，需要权衡这些缺点，并确保选择了最适合的设计方案。
# 组合模式VS递归

- 组合模式和递归之间存在紧密的关联。
- 组合模式通常涉及到处理层次结构，其中包含了一个节点和其子节点（如果有）。
- 在实现组合模式时，通常会使用递归来遍历这样的层次结构。
- 递归允许我们在处理组合模式的结构时，能够在每个节点上重复执行相同的操作，直到达到叶子节点为止。

具体来说，在组合模式中：

1.  **组合对象**（例如文件夹）可以包含其他组合对象或者叶子对象（例如文件）。这种嵌套的结构可以通过递归来处理，递归允许我们在每个组合对象中继续遍历其子节点。
2.  **操作**通常会在整个层次结构上递归执行。例如，计算文件夹的大小可能需要递归地计算其所有子文件夹的大小，并将它们加总起来。
3.  **结构的变化**也可能需要递归。例如，删除一个文件夹可能需要递归地删除其所有子节点。

总之，递归是实现组合模式时常见且重要的技术之一。它使得我们能够在处理层次结构时以一种简洁而优雅的方式进行操作。
