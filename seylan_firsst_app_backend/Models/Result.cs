namespace seylan_firsst_app_backend.Models
{
    public class Result<T>
    {
        public bool isSuccess { get; set; }
        public string ErrorMessage { get; set; }
        public string InfoMessage { get; set; }
        public T data { get; set; }
    }
}
