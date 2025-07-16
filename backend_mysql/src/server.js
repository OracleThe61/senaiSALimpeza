const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',      
    password: '861391',    
    database: 'cleanMatch',
    port: 3307,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.use(cors());
app.use(express.json());

app.get('/usuarios', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios');
        res.json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar usuarios' });
    }
});

app.get('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Usuario não encontrado' });
        }
        res.json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar Usuario' });
    }
});


app.post('/usuarios', async (req, res) => {
    const { nome, email, senha, tipo_conta} = req.body;
    console.log(req.body);
    try {
        const [result] = await pool.query(
            'INSERT INTO usuarios (nome, email, senha, tipo_conta) VALUES (?, ?, ?, ?)',
            [nome, email, senha, tipo_conta]
        );
        const [novoUsuario] = await pool.query('SELECT * FROM usuarios WHERE id_usuario = ?', [result.insertId]);
        res.status(201).json(novoUsuario[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao adicionar Usuario' });
    }
});

app.put('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, contato, tipo_conta, cep, estado, cidade, rua, valor_min, valor_max, cargaHoraria_inicio, cargaHoraria_fim, descricao } = req.body;
    console.log(req.params)
    try {
        const [result] = await pool.query(
            'UPDATE usuarios SET nome = ?, email = ?, contato = ?, tipo_conta = ?, cep = ?, estado = ?, cidade=?, rua = ?, valor_min = ?, valor_max = ?, cargaHoraria_inicio = ?, cargaHoraria_fim = ?, descricao = ? WHERE id_usuario = ?',
            [nome, email, contato, tipo_conta, cep, estado, cidade, rua, valor_min, valor_max, cargaHoraria_inicio, cargaHoraria_fim, descricao, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario não encontrado' });
        }
        const [usuarioAtualizado] = await pool.query('SELECT * FROM usuarios WHERE id_usuario= ?', [id]);
        res.json(usuarioAtualizado[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao atualizar usuario' });
    }
});

app.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario não encontrado' });
        }
        res.json({ message: 'Usuario deletado com sucesso' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao deletar Usuario' });
    }
});

app.get('/foto_perfil', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM foto_perfil');
        res.json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar foto de perfil' });
    }
});

app.get('/foto_perfil/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM foto_perfil WHERE id_foto_perfil = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Foto não encontrado' });
        }
        res.json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar foto' });
    }
});

app.post('/foto_perfil', async (req, res) => {
    const { link_foto, usuarios_id} = req.body;
    console.log(req.body);
    try {
        const [result] = await pool.query(
            'INSERT INTO foto_perfil (foto, usuarios_id) VALUES (?, ?)',
            [link_foto, usuarios_id]
        );
        const [novaFoto] = await pool.query('SELECT * FROM foto_perfil WHERE id_foto_perfil = ?', [result.insertId]);
        res.status(201).json(novaFoto[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao adicionar foto' });
    }
});

app.put('/foto_perfil/:id', async (req, res) => {
    const { id } = req.params;
    const { link_foto } = req.body;
    console.log(req.params)
    try {
        const [result] = await pool.query(
            'UPDATE foto_perfil SET foto = ? WHERE id_foto_perfil = ?',
            [link_foto, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Foto não encontrado' });
        }
        const [fotoAtualizado] = await pool.query('SELECT * FROM foto_perfil WHERE id_foto_perfil= ?', [id]);
        res.json(fotoAtualizado[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao atualizar foto' });
    }
});


app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
