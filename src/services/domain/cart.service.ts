import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';
import { Cart } from '../../models/cart';
import { ProdutoDTO } from '../../models/produto.dto';

// Essa servico esta na parte de domain, mas eh um domain do frontend, ele nao esta no backend!
@Injectable()
export class CartService {

    constructor(public storage: StorageService) {
    }

    createOrClearCart() : Cart {
        // Esse metodo cria ou limpa o carrinho

        let cart: Cart = {items: []}; // Cria/Limpa um carrinho
        this.storage.setCart(cart); // Armazeno o cart com a lista de itens definida
        return cart;
    }

    getCart() : Cart {
        // Esse metodo obtem um carrinho

        let cart: Cart = this.storage.getCart(); // Pega o carrinho que esta armazenado no storage

        if (cart == null) {
            // Caso o carrinho ainda nao exista, eu crio ele
            cart = this.createOrClearCart(); // Crio o cart
        }

        return cart;
    }

    addProduto(produto: ProdutoDTO) : Cart {
        // Esse metodo adiciona produtos no carrinho

        let cart = this.getCart(); // Pego o carrinho armazenado

        // O comando abaixo verifica se o produto ja existe no carrinho
        // Essa verificacao eh feita pela comparacao entre o ID do produto passado como parametro e de um produto "x" que ja esteja no carrinho
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        // Fim do comando

        if (position == -1) {
            // Caso a position seja -1, significa que nao existe no carrinho
            // Logo, adiciono esse produto no carrinho com a quantidade 1
            cart.items.push({quantidade: 1, produto: produto}); // Insere elemento na lista
        }

        this.storage.setCart(cart); // Armazena carrinho

        return cart;
    }
}