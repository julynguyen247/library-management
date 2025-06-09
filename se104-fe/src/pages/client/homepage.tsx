import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBooksAndCommentsAPI, listAuthorAPI } from "@/services/api";
import { message } from "antd";

const UserHomepage = () => {
  const navigate = useNavigate();

  // State lưu sách nổi bật
  const [featuredBooks, setFeaturedBooks] = useState<IGetAllBookAndComment[]>([]);

  // State lưu danh sách tác giả
  const [authors, setAuthors] = useState<IAddAuthor[]>([]);

  useEffect(() => {
    const fetchBooksAndAuthors = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          message.warning("Lỗi không có token");
          return;
        }

        // Lấy sách
        const booksResponse = await getAllBooksAndCommentsAPI(token);
        if (Array.isArray(booksResponse)) {
          setFeaturedBooks(booksResponse.slice(0, 5));
        } else {
          message.error("Dữ liệu sách trả về không đúng định dạng.");
        }

        // Lấy danh sách tác giả
        const authorRes = await listAuthorAPI(token);
        if (Array.isArray(authorRes)) {
          setAuthors(authorRes);
        } else {
          message.error("Dữ liệu tác giả trả về không đúng định dạng.");
        }
      } catch (error) {
        console.error(error);
        message.error("Lỗi khi tải dữ liệu.");
      }
    };

    fetchBooksAndAuthors();
  }, []);

  return (
    <div className="bg-[#f4f7f9] min-h-screen ">
      <div className="bg-[#153D36] px-6 md:px-12 py-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search..."
          className="w-full max-w-[400px] px-4 py-2 rounded-full outline-none text-sm text-black bg-white border border-black"
        />
        <div className="text-xl text-white ml-4">🔔</div>
      </div>

      <div className="container max-w-screen-xl mx-auto px-4 md:px-12 ">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-2/3 flex flex-col gap-6">
            {/* Featured Books */}
            <div className="bg-white rounded-xl p-6 md:p-8 shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg text-[#154734]">
                  Nổi bật
                </h2>
                <a
                  href="#"
                  className="text-blue-500 text-sm"
                  onClick={() => navigate("featured")}
                >
                  Xem tất cả &gt;
                </a>
              </div>
              <div className="flex gap-4 overflow-x-auto">
                {featuredBooks.map((book, i) => (
                  <div
                    key={i}
                    className="min-w-[140px] bg-white rounded-lg shadow p-2 cursor-pointer hover:shadow-lg transition"
                    onClick={() => navigate(`/detail/${book.idBook}`)}
                  >
                    {book.image ? (
                      <img
                        src={book.image}
                        alt={book.nameBook}
                        className="h-40 w-full object-cover rounded mb-2"
                      />
                    ) : (
                      <div className="h-40 bg-gray-200 rounded mb-2" />
                    )}
                    <p className="text-sm font-semibold text-[#154734]">{book.nameBook}</p>
                    <p className="text-xs text-gray-500">
                      {book.authors.length > 0 ? book.authors[0].nameAuthor : "Không rõ tác giả"}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Borrowing History */}
            <div className="bg-white rounded-xl p-4 shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg text-[#154734]">
                  Lịch sử mượn sách
                </h2>
                <a href="#" className="text-blue-500 text-sm">
                  Xem tất cả &gt;
                </a>
              </div>
              <div className="flex gap-4 overflow-x-auto">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="min-w-[140px] bg-white rounded-lg shadow p-2 cursor-pointer hover:shadow-lg transition"
                    onClick={() => navigate(`/detail`)}
                  >
                    <div className="h-40 bg-gray-200 rounded mb-2" />
                    <p className="text-sm font-semibold text-[#154734]">
                      One Bullet Away
                    </p>
                    <p className="text-xs text-gray-500">Nathaniel Fick</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Author & New Books */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <div className="bg-white rounded-xl p-6 md:p-4.5 shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg text-[#154734]">
                  Tác giả
                </h2>
                <a
                  href="#"
                  className="text-blue-500 text-sm"
                  onClick={() => navigate("/author")}
                >
                  Xem tất cả &gt;
                </a>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {authors.slice(0, 4).map((author, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center text-center border rounded p-2"
                    onClick={() => navigate(`/authorInfo/${author.idAuthor}`)}
                  >
                    <div className="w-12 h-12 rounded-full bg-gray-300" />
                    <p className="text-sm font-semibold text-[#154734]">
                      {author.nameAuthor}
                    </p>
                  
                    <a href="#" className="text-blue-500 text-xs mt-1">
                      Thông tin chi tiết
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg text-[#154734]">
                  Sách mới
                </h2>
                <a
                  href="#"
                  className="text-blue-500 text-sm"
                  onClick={() => navigate("/new-books")}
                >
                  Xem tất cả &gt;
                </a>
              </div>
              <div className="flex gap-4 overflow-x-auto">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="min-w-[140px] bg-white rounded-lg shadow p-2 cursor-pointer hover:shadow-lg transition"
                    onClick={() => navigate(`/detail`)}
                  >
                    <div className="h-40 bg-gray-200 rounded mb-2" />
                    <p className="text-sm font-semibold text-[#154734]">
                      One Bullet Away
                    </p>
                    <p className="text-xs text-gray-500">Nathaniel Fick</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHomepage;
