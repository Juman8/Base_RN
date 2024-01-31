

Admin:
1. Schema -> khu vực chứa các schema cho formik;
2. navigation: khu vực cấu hình cho navigation và route cho app;
3. firebase: khu vực chứa config firebase(lưu ý phải ném các config trong env hiện tại trong base đang để hardcode)
4. Layout: khu vực thao tác với các page route chính (chỉ chứa các view main không chứa các thành phần logic)
5. views: chứa các content detail layout ()
6. config: vùng chứa các thư mục config trong app, đa số sẽ là enums, interface, contans...
7. types: khu vực khai báo các type cho module, thư viện phục vụ cho rule TS trong project
8. components: chứa các thư mục component dùng chung


Client_Side:
1. pages (nơi chứa các phần route cho ứng dụng ),
2. modules (nới chứa các logic cho ứng dụng ),
3. layout (nơi chứa các UI layout).
4. themes: chứa theme mode
5. translations: multi language

App:
