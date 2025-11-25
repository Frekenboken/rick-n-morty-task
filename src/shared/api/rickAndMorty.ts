// api/characters.ts
import axios from 'axios'
import type { CharactersResponse, Character } from '../../entities/character/model/types'

const api = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
})

export const charactersAPI = {
  /**
   * Получить персонажей с конкретной страницы
   */
  getCharacters(page: number = 1) {
    return api.get<CharactersResponse>(`/character?page=${page}`)
  },

  /**
   * Получить одного персонажа по ID
   */
  getCharacter(id: number) {
    return api.get<Character>(`/character/${id}`)
  },
}
