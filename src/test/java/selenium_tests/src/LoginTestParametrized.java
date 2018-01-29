package selenium_tests.src;

import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import selenium_tests.src.po.LoginPage;
import selenium_tests.src.po.TaskListPage;
import utils.*;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;

import java.util.Collection;
import java.util.concurrent.TimeUnit;

@RunWith(value = Parameterized.class)
@SuppressWarnings("Duplicates")
public class LoginTestParametrized {

  String strUsername;
  String strPassword;

  private static WebDriver driver;
  private static LoginPage login;

  public LoginTestParametrized(String strUsername, String strPassword) {
    this.strUsername = strUsername;
    this.strPassword = strPassword;
  }

  @Parameterized.Parameters(name = "User no: {index}, username: {0}, password: {1}")
  public static Collection<String[]> testingData() {
    return CSVfileReader.readCSVfileToCollection("resources/login_credentials.csv");
  }

  @BeforeClass
  public static void setUp() {
    DesiredCapabilities dc = DesiredCapabilities.chrome();
    dc.setJavascriptEnabled(true);
    driver = new RemoteWebDriver(dc);
    driver.manage().timeouts().implicitlyWait(1000, TimeUnit.MILLISECONDS);
    login = new LoginPage(driver);
    login.goTo();
  }

  @Test
  public void testWithGrid() {
    try {
      login.login(strUsername, strPassword);
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
    TaskListPage tasks = new TaskListPage(driver);
    Assert.assertTrue(tasks.getTaskList().isDisplayed());

  }


}
