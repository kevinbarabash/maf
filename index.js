require('babel/register');
var maf = require('./maf');


var list = new maf.NodeList();

list.append(new maf.SymbolNode(1));
list.append(new maf.SymbolNode('+'));
list.append(new maf.SymbolNode(2));
//list.append(new maf.SymbolNode('-'));
//list.append(new maf.SymbolNode(3));

//console.log(list.toArray());

var middle = list.first.next;

console.log(middle);

list.insertAfter(new maf.SymbolNode('a'), middle);
list.insertBefore(new maf.SymbolNode('b'), middle);

console.log(list.toArray());

list.remove(middle);

console.log(list.toArray());

var plus = new maf.SymbolNode('+');

var container = new maf.ContainerNode();
container.append(new maf.SymbolNode(1));
container.append(plus);
container.append(new maf.SymbolNode(2));
container.append(new maf.SymbolNode('*'));

var inner_container = new maf.ContainerNode();
inner_container.append(new maf.SymbolNode(3));
inner_container.append(new maf.SymbolNode('-'));
inner_container.append(new maf.SymbolNode(4));

container.append(inner_container);

console.log(container.children.toArray());

console.log(plus.parent);
