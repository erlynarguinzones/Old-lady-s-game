import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, NgIf, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  board: string[] = Array(9).fill(null);
  currentPlayer: string = 'X';
  winner: string | null = null;
  winningCells: number[] = Array(3).fill(null);
  newBoard: any[] = [];

  makeMove(index: number): void {
    // si aun no se ha seleccionado un ganador y la celda esta vacia
    if (!this.board[index] && !this.winner) {
      this.board[index] = this.currentPlayer;
      if (this.checkWinner()) {
        // si hay un ganador
        this.winner = this.currentPlayer;
      } else {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  }

  // funcion para verificar si hay un ganador
  checkWinner(): boolean {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        this.board[a] &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      ) {
        this.winningCells = combination;
        for (let i = 0; i < this.board.length; i++) {
          this.newBoard.push({
            value: this.board[i],
            isWinningCell: this.winningCells.includes(i),
          });
        }
        return true;
      }
    }
    return false;
  }

  // funcion para reiniciar el juego
  reset() {
    this.board = Array(9).fill(null);
    this.currentPlayer = 'X';
    this.winner = null;
    this.winningCells = Array(3).fill(null);
    this.newBoard = [];
  }
}
