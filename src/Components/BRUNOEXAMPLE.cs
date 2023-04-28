using UnityEngine;
public class CharacterControlle : MonoBehaviour
{
    private Rigidbody rb;
    [SerializeField] private float speed;

    private void Start()
    {
        rb = this.GetComponent<Rigidbody>();
    }

    private void Update()
    {
        float x = Input.GetAxis("Horizontal");
        float z = Input.GetAxis("Vertical");
        Vector3 dir = new Vector3(x, 0, z) * speed;

        rb.velocity = dir;

        float angle = Mathf.Atan2(x, z);
        angle *= Mathf.Rad2Deg;
        Vector3 angleVector = Vector3.up * angle;

        transform.GetChild(0).transform.eulerAngles = angleVector;
    }
}