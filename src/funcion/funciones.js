function explode_filtros_globales_v2(n_campo, n_tipo_campo) {
    if (!n_tipo_campo) {
      return '';
    }
  
    let filtro_campo = '';
    let or = '';
  
    n_tipo_campo.split(',').forEach(id_valor => {
      const id_campo = parseInt(id_valor.trim(), 10);
  
      filtro_campo += `${or}(${n_campo} = '${id_campo}')`;
      or = ' OR ';
    });
  
    return filtro_campo;
  }
  
  module.exports = explode_filtros_globales_v2;
  