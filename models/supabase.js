const supabase = require('./supabaseClient');

// CREATE: Adicionar um novo produto
async (req, res) => {
  const { nome, preco } = req.body;
  const { data, error } = await supabase
    .from('produtos')
    .insert([{ nome, preco }]);
  
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
}

// READ: Listar todos os produtos
async (req, res) => {
  const { data, error } = await supabase
    .from('produtos')
    .select('*');
  
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data);
}

// UPDATE: Atualizar um produto
async (req, res) => {
  const { id } = req.params;
  const { nome, preco } = req.body;
  const { data, error } = await supabase
    .from('produtos')
    .update({ nome, preco })
    .eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data);
}

// DELETE: Remover um produto
async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('produtos')
    .delete()
    .eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  res.status(204).end();
}
