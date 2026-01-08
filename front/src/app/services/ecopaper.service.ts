import { Injectable } from '@angular/core';
import { getJson } from "serpapi";


interface Artigo {
  titulo: string;
  autor: string;
  publicacao: string;
  linkEncontrado: string;
  previa: string;
  link: string;
}

@Injectable({
  providedIn: 'root'
})
export class EcopaperService {



  constructor() { }





  async buscarArtigos(pesquisa: string, scholarKey: string, scopusKey: string): Promise<Artigo[]> {
    try {
      const artigosGoogleScholar = await this.buscarArtigosGoogleScholar(pesquisa, scholarKey);
      const artigosScopus = await this.buscarArtigosScopus(pesquisa, scopusKey);
      return [...artigosGoogleScholar, ...artigosScopus];
    } catch (error) {
      console.error('Erro ao buscar artigos:', error);
      throw new Error('Erro ao buscar artigos');
    }
  }

  private async buscarArtigosScopus(pesquisa: string, scopusKey: string): Promise<Artigo[]> {
    const apiUrl = `https://api.elsevier.com/content/search/scopus?httpaccept=application/json&query=${encodeURIComponent(pesquisa)}&apiKey=${scopusKey}`;
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return this.formatScopusResponse(response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  private async buscarArtigosGoogleScholar(pesquisa: string, scholarKey: string): Promise<Artigo[]> {
    const json = await getJson({
      engine: 'google_scholar',
      q: pesquisa,
      api_key: scholarKey,
    });

    // Aqui precisa formatar o retorno do Google Scholar
    const resultados: Artigo[] = json.organic_results?.map(item => ({
      titulo: item.title || '',
      autor: item.author || '',            // Depende dos dados retornados
      publicacao: item.publication || '',  // Pode ser journal, conference, etc.
      previa: item.snippet || '',          // Um resumo ou trecho se houver
      linkEncontrado: 'https://scholar.google.com',
      link: item.link || '',
    })) || [];

    return resultados;
  }

  private async formatScopusResponse(scopusResponse: Response): Promise<Artigo[]> {
    const json = await scopusResponse.json();
    const entries = json['search-results']?.entry || [];

    return entries.map((result: any) => ({
      titulo: result['dc:title'],
      linkEncontrado: 'https://www.scopus.com/',
      link: result.link?.[2]?.['@href'] || '',
    }));

}

}
