
const salvarUsuario = ( dto : any) => {
    localStorage.setItem('usuario', JSON.stringify(dto.usuario));
    localStorage.setItem('token', dto.token);
    localStorage.setItem('refreshToken', dto.refreshToken);
}

const recuperarUsuario = () => {
    const usuarioJSON = localStorage.getItem('usuario');
    return (usuarioJSON) ? JSON.parse(usuarioJSON) : null;
}

const recuperarToken = () => {
    return localStorage.getItem('token');
}

const recuperarRefreshToken = () => {
    return localStorage.getItem('refreshToken');
}
