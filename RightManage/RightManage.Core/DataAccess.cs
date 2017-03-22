using RightManage.Data;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace RightManage.Core
{
    public class DataAccess
    {
        public interface IRepository<T> where T : class
        {
            // Methods
            void Add(T entity);
            void Add(ICollection<T> entitys);
            void Delete(T entity);
            void Delete(Func<T, bool> predicate);
            void DeleteByKey(params object[] keyValues);
            void Edit(T entity);
            void Edit(T bean, Action<T> editBlock);
            T Get(Expression<Func<T, bool>> where);
            T GetByKey(params object[] keyValues);
            ICollection<T> GetMany(Func<T, bool> where);
            ICollection<T> GetMany<S>(Expression<Func<T, bool>> where, Expression<Func<T, S>> orderByExpression, bool IsDESC, int PageIndex, int PageSize, out int TotalRecord);
            IQueryable<T> QueryMany(Expression<Func<T, bool>> where);
            void Update(T entity);
            // void Update(T entity, params string[] columns);

        }


        public abstract class RepositoryBase<T> : IDisposable, IRepository<T> where T : class
        {
            // Fields
            protected readonly IDbSet<T> dbset;
            private BaseDBContext fDataContext;

            // Methods
            protected RepositoryBase(BaseDBContext DbContext)
            {
                this.fDataContext = DbContext;
                this.dbset = this.fDataContext.Set<T>();
            }
            public virtual void Add(T entity)
            {
                this.dbset.Add(entity);

            }
            public virtual void Add(ICollection<T> entitys)
            {
                foreach (T local in entitys)
                {
                    this.dbset.Add(local);
                }

            }
            public virtual void Delete(T entity)
            {
                this.dbset.Remove(entity);

            }
            public virtual void Delete(Func<T, bool> predicate)
            {
                IEnumerable<T> enumerable = this.dbset.Where<T>(predicate).AsEnumerable<T>();
                foreach (T local in enumerable)
                {
                    this.dbset.Remove(local);
                }

            }
            public virtual void DeleteByKey(params object[] keyValues)
            {
                T entity = this.dbset.Find(keyValues);
                this.dbset.Remove(entity);

            }
            public void Dispose()
            {
                this.Dispose(true);
                GC.SuppressFinalize(this);

            }
            protected virtual void Dispose(bool disposing)
            {
                if (disposing && (this.fDataContext != null))
                {
                    this.fDataContext.Dispose();
                }

            }
            public virtual void Edit(T entity)
            {

            }
            public virtual void Edit(T bean, Action<T> editBlock)
            {
                editBlock(bean);

            }
            public virtual T Get(Expression<Func<T, bool>> where) =>
     this.dbset.Where<T>(where).FirstOrDefault<T>();

            public virtual T GetByKey(object key) =>
        this.dbset.Find(new object[] { key });

            public virtual T GetByKey(params object[] keyValues) =>
    this.dbset.Find(keyValues);

            public virtual ICollection<T> GetMany(Func<T, bool> where) =>
    this.dbset.Where<T>(where).ToList<T>();


            public virtual ICollection<T> GetMany<S>(Expression<Func<T, bool>> where, Expression<Func<T, S>> orderByExpression, bool IsDESC, int PageIndex, int PageSize, out int TotalRecord)
            {
                TotalRecord = 0;
                IOrderedQueryable<T> source = IsDESC ? this.dbset.OrderByDescending<T, S>(orderByExpression) : this.dbset.OrderBy<T, S>(orderByExpression);
                if (TotalRecord >= 0)
                {
                    if (where != null)
                    {
                        IEnumerable<T> enumerable = source.Where<T>(where.Compile());
                        TotalRecord = enumerable.Count<T>();
                        return enumerable.Skip<T>(((PageIndex - 1) * PageSize)).Take<T>(PageSize).ToList<T>();
                    }
                    TotalRecord = source.Count<T>();
                    return source.Skip<T>(((PageIndex - 1) * PageSize)).Take<T>(PageSize).ToList<T>();
                }
                return null;

            }

            public virtual IQueryable<T> QueryMany(Expression<Func<T, bool>> where) =>
    this.dbset.Where<T>(where);



            public virtual void Update(T entity)
            {
                this.dbset.Attach(entity);
                this.fDataContext.Entry<T>(entity).State = EntityState.Modified;
            }
            //public virtual void Update(T entity, params string[] columns)
            //{
            //    this.dbset.Attach(entity);
            //    //System.Data.Entity.Core.Objects.ObjectStateEntry objectStateEntry = this.fDataContext.ObjectStateManager.GetObjectStateEntry(entity);
            //    foreach (string str in columns)
            //    {
            //        objectStateEntry.SetModifiedProperty(str);
            //    }

            //}

            // Properties
            public DbContext DataContext =>
    this.fDataContext;


            public IDbSet<T> DbSet => this.dbset;

        }


        public class Repository<T, TContext> : RepositoryBase<T>, IDisposable where T : class where TContext : BaseDBContext
        {
            // Methods
            public Repository(BaseDBContext dbContext) : base(dbContext)
            {
            }
            public override void Add(T entity)
            {
                BaseTableData model = entity as BaseTableData;
                if (model != null)
                {
                    if (string.IsNullOrEmpty(model.FControlUnitID))
                    {
                        model.FControlUnitID = Singleton.Current.FControlUnitID;
                    }
                    if (string.IsNullOrEmpty(model.CREATE_ID))
                    {
                        model.CREATE_ID = Singleton.Current.UserID;
                    }
                    if (!model.CREATE_TIME.HasValue)
                    {
                        model.CREATE_TIME = new DateTime?(DateTime.Now);
                    }
                    if (!model.UPDATE_TIME.HasValue)
                    {
                        model.UPDATE_TIME = new DateTime?(DateTime.Now);
                    }
                    if (string.IsNullOrEmpty(model.UPDATE_ID))
                    {
                        model.UPDATE_ID = Singleton.Current.UserID;
                    }
                }
                this.RecordInsertLog(entity);
                base.Add(entity);

            }
            public int Commit() =>
     base.DataContext.SaveChanges();



            public override void Edit(T entity)
            {
                BaseTableData model = entity as BaseTableData;
                if (model != null)
                {
                    model.UPDATE_TIME = new DateTime?(DateTime.Now);
                    model.UPDATE_ID = Singleton.Current.UserID;
                }
                this.RecordUpdateLog(entity);
                base.Edit(entity);

            }
            //       public string GetUniId() =>
            //this.DBContext?.GetUniId();
            public virtual IQueryable<T> QueryDefault(Expression<Func<T, bool>> where) =>
           base.dbset.Where<T>(where);
            public virtual void RecordInsertLog(T entity)
            {

            }
            public virtual void RecordUpdateLog(T entity) { }
            protected void SetDefaultValue<TKey>(ref TKey val, TKey newVal, TKey emptyVal)
            {
                if (!val.Equals(emptyVal))
                {
                    val = newVal;
                }

            }
            public override void Update(T entity)
            {
                BaseTableData model = entity as BaseTableData;
                if (model != null)
                {
                    model.UPDATE_TIME = new DateTime?(DateTime.Now);
                    model.UPDATE_ID = Singleton.Current.UserID;
                }
                this.RecordUpdateLog(entity);
                base.Update(entity);

            }

            // Properties
            public TContext DBContext =>
    (base.DataContext as TContext);


        }




    }
}
